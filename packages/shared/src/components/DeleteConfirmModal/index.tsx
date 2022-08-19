import React, { useState } from 'react';
import type { ReactNode, ChangeEvent } from 'react';
import { Modal } from '@kubed/components';
import type { ModalProps } from '@kubed/components';
import { Close } from '@kubed/icons';

import {
  Body,
  Header,
  Title,
  CloseIconWrapper,
  Content,
  Tip,
  StyledInput,
  Footer,
  StyledButton,
} from './styles';

type OmitProps =
  | 'confirmLoading'
  | 'title'
  | 'description'
  | 'titleIcon'
  | 'closable'
  | 'onOk'
  | 'onCancel'
  | 'header'
  | 'footer'
  | 'okText'
  | 'cancelText'
  | 'okButtonProps'
  | 'cancelButtonProps'
  | 'closeIcon';

interface DeleteConfirmModalProps extends Omit<ModalProps, OmitProps> {
  type?: string;
  resource?: string | number | string[] | number[];
  deleteCluster?: boolean;
  app?: any;
  title?: ReactNode;
  tip?: ReactNode;
  confirmLoading?: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export type { DeleteConfirmModalProps };

export function DeleteConfirmModal({
  type,
  resource: resourceProp,
  deleteCluster,
  app,
  title: titleProp,
  tip: tipProp,
  confirmLoading,
  onCancel,
  onOk,
  ...rest
}: DeleteConfirmModalProps) {
  const typeKey = type || undefined;
  const typeKeyLow = type ? `${type}_LOW` : undefined;
  const typeKeyPl = type ? `${type}_PL` : undefined;
  const resource = (() => {
    if (resourceProp) {
      if (Array.isArray(resourceProp)) {
        return resourceProp.join(', ');
      }

      return String(resourceProp);
    }

    return '';
  })();
  const hasResourceAndType = resource && type;
  const isSingleResource = resource.split(', ').length === 1;
  const title = (() => {
    if (titleProp) {
      return titleProp;
    }

    if (hasResourceAndType) {
      if (isSingleResource) {
        return t('DELETE_TITLE_SI', { type: t(typeKey) });
      }

      return t('DELETE_TITLE_PL', { type: t(typeKeyPl) });
    }

    return t('DELETE');
  })();
  const tip = (() => {
    if (tipProp) {
      return tipProp;
    }

    if (deleteCluster) {
      return t('UNBIND_CLUSTER_DESC', { name: resource });
    }

    if (app) {
      t('DELETE_APP_RESOURCE_TIP', { type, resource, app });
    }

    if (hasResourceAndType) {
      if (isSingleResource) {
        return t('DELETE_RESOURCE_TYPE_DESC_SI', {
          type: t(typeKeyLow),
          resource,
        });
      }

      return t('DELETE_RESOURCE_TYPE_DESC_PL', {
        type: t(typeKeyLow),
        resource,
      });
    }

    return t('DELETE_DESC', { resource, type: '' });
  })();

  const [confirmResource, setConfirmResource] = useState('');
  const handleConfirmResourceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setConfirmResource(value);
  };

  return (
    <Modal width={504} header={null} footer={null} closable={false} {...rest}>
      <Body>
        <Header>
          <CloseIconWrapper>
            <Close variant="light" size={16} />
          </CloseIconWrapper>
          <Title as="h5">{title}</Title>
        </Header>
        <Content>
          <Tip as="p" dangerouslySetInnerHTML={{ __html: tip }} />
          {resource && (
            <StyledInput
              name="confirmResource"
              placeholder={resource}
              autoFocus={true}
              value={confirmResource}
              onChange={handleConfirmResourceChange}
            />
          )}
        </Content>
      </Body>
      <Footer>
        <StyledButton onClick={onCancel}>{t('CANCEL')}</StyledButton>
        <StyledButton
          color="error"
          shadow
          loading={confirmLoading}
          disabled={confirmLoading || (resource ? resource !== confirmResource : false)}
          onClick={onOk}
        >
          {t('OK')}
        </StyledButton>
      </Footer>
    </Modal>
  );
}
