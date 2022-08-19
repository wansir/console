import React from 'react';
import type { ReactNode } from 'react';
import { Modal, Form, FormItem, Input, Button } from '@kubed/components';
import type { ModalProps } from '@kubed/components';
import { Close } from '@kubed/icons';

import {
  Body,
  Header,
  Title,
  CloseIconWrapper,
  Content,
  Tip,
  Footer,
  StyledButton,
} from './styles';

interface DeleteModalProps extends Omit<ModalProps, 'title'> {
  type?: string;
  resource?: string | number | string[] | number[];
  deleteCluster?: boolean;
  app?: any;
  title?: ReactNode;
  tip?: ReactNode;
}

export type { DeleteModalProps };

export default function DeleteConfirmModal({
  type,
  resource: resourceProp,
  deleteCluster,
  app,
  title: titleProp,
  tip: tipProp,
  confirmLoading,
  ...rest
}: DeleteModalProps) {
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

  return (
    <Modal visible={true} width={504} header={null} footer={null} closable={false} {...rest}>
      <Form>
        <Body>
          <Header>
            <CloseIconWrapper>
              <Close variant="light" size={16} />
            </CloseIconWrapper>
            <Title as="h5">{title}</Title>
          </Header>
          <Content>
            <Tip as="p" dangerouslySetInnerHTML={{ __html: tip }} />
            <FormItem name="confirm">
              <Input name="confirm" placeholder={resource} autoFocus={true} />
            </FormItem>
          </Content>
        </Body>
        <Footer>
          <StyledButton>{t('CANCEL')}</StyledButton>
          <StyledButton
            type="submit"
            color="error"
            shadow
            loading={confirmLoading}
            disabled={confirmLoading || (resource ? true : false)}
          >
            {t('OK')}
          </StyledButton>
        </Footer>
      </Form>
    </Modal>
  );
}
