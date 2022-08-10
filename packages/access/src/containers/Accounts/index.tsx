import React from 'react';

import { Banner } from '@kubed/components';
import { Human } from '@kubed/icons';
import { DataTable } from '@ks-console/shared';
import type { Column } from '@ks-console/shared';

export default function Accounts() {
  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'spec.names.kind',
    },
    {
      title: t('STATUS'),
      field: 'metadata.name',
    },
    {
      title: t('PLATFORM_ROLE'),
      field: 'spec.scope',
    },
    {
      title: t('LAST_LOGIN'),
      field: 'metadata.creationTimestamp',
    },
  ];

  return (
    <>
      <Banner icon={<Human />} title={t('USER_PL')} description={t('USER_DESC')} className="mb12" />
      <DataTable columns={columns} tableName="users" rowKey="name" />
    </>
  );
}
