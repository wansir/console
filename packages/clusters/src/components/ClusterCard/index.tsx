import React from 'react';
import { Card, Field, Entity } from '@kubed/components';
import { formatTime } from '@ks-console/shared';
import ClusterTitle from '../ClusterTitle';

const ClusterCard = ({ data, className }: any) => (
  <Card contentStyle={{ padding: '8px' }} hoverable className={className}>
    <Entity bordered={false}>
      <ClusterTitle cluster={data} to={`/clusters/${data.name}`} />
      <Field label={t('NODE_COUNT')} value={data.nodeCount} width="16.6%" />
      <Field label={t('KUBERNETES_VERSION')} value={data.kubernetesVersion} width="16.6%" />
      <Field label={t('PROVIDER')} value={data.provider} width="16.6%" />
      <Field label={t('CREATION_TIME')} value={formatTime(data.createTime)} width="16.6%" />
    </Entity>
  </Card>
);

export default ClusterCard;
