import React from 'react';
// import type { ReactNode } from 'react';
import { Modal, Input, FormItem } from '@kubed/components';
// import type { ModalProps } from '@kubed/components';

import { StyledForm, Header, Title, StyledCloseIcon } from './styles';

interface DeleteModalProps {
  type: string;
  resource: string;
  deleteCluster?: boolean;
  app?: any;
  // title: ReactNode;
  // tips: ReactNode;
  // resource: string | number | string[] | number[];
}

export type { DeleteModalProps };

export default function DeleteConfirmModal({
  type,
  resource,
  deleteCluster,
  app,
}: DeleteModalProps) {
  const typeKey = type || undefined;
  const typeKeyLow = type ? `${type}_LOW` : undefined;
  const typeKeyPl = type ? `${type}_PL` : undefined;
  const hasResourceAndType = resource && type;
  const isSingleResource = resource.split(', ').length === 1;
  const title = (() => {
    // TODO: missing title

    if (hasResourceAndType) {
      if (isSingleResource) {
        return t('DELETE_TITLE_SI', { type: t(typeKey) });
      }

      return t('DELETE_TITLE_PL', { type: t(typeKeyPl) });
    }

    return t('DELETE');
  })();
  const tip = (() => {
    // TODO: missing description

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
    <Modal visible={true} width={504} header={null} footer={null} closable={false}>
      <StyledForm>
        <Header>
          <StyledCloseIcon variant="light" size={16} />
          <Title as="h5">{title}</Title>
        </Header>
        <FormItem name="confirm" label={<p dangerouslySetInnerHTML={{ __html: tip }} />}>
          <Input name="confirm" placeholder={resource} autoFocus={true} />
        </FormItem>
      </StyledForm>
    </Modal>
  );
}
