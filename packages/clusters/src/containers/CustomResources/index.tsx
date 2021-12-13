import React from 'react';
import { Link } from 'react-router-dom';
import { Banner, Button, Field } from '@kubed/components';
import { Select } from '@kubed/icons';
import { DataTable, Column, getServedVersion, formatTime } from '@ks-console/shared';

const CustomResources = () => {
  const url = '/kapis/clusters/host/resources.kubesphere.io/v1alpha3/customresourcedefinitions';

  const columns: Column[] = [
    {
      title: t('KIND_TCAP'),
      field: 'spec.names.kind',
      render: (value, row) => (
        <Field
          value={value}
          label={`${row.spec.group}/${getServedVersion(row)}`}
          as={Link}
          to="/adsf"
        />
      ),
    },
    {
      title: t('NAME'),
      field: 'metadata.name',
      searchable: true,
      id: 'name',
    },
    {
      title: t('SCOPE_TCAP'),
      field: 'spec.scope',
      canHide: true,
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'metadata.creationTimestamp',
      id: 'createTime',
      sortable: true,
      canHide: true,
      width: '19%',
      render: time => formatTime(time),
    },
  ];

  const batchActions = <Button color="error">删除</Button>;

  return (
    <>
      <Banner icon={<Select />} title={t('CRD')} description={t('CRD_DESC')} className="mb12" />
      <DataTable
        columns={columns}
        tableName="customresourcedefinitions"
        rowKey="name"
        url={url}
        batchActions={batchActions}
        useStorageState={true}
      />
    </>
  );
};

export default CustomResources;
