import React from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { Card, Field, LoadingOverlay } from '@kubed/components';
import { Enterprise, Human, Appcenter, Blockchain } from '@kubed/icons';
import { monitorStore, isMultiCluster, enableAppStore, formatTime } from '@ks-console/shared';
import { useQuery } from 'react-query';

import { Wrapper, StatTitle, StatItem, EmptyHistory } from './styles';

const MetricTypes = {
  cluster_count: 'kubesphere_cluser_count',
  workspace_count: 'kubesphere_workspace_count',
  account_count: 'kubesphere_user_count',
  app_template_count: 'kubesphere_app_template_count',
};

const resources = [
  {
    icon: <Enterprise size={40} />,
    name: 'WORKSPACE',
    link: '/access/workspaces',
    metric: 'kubesphere_workspace_count',
  },
  {
    icon: <Human size={40} />,
    name: 'USER',
    link: '/access/accounts',
    metric: 'kubesphere_user_count',
  },
  {
    icon: <Appcenter size={40} />,
    name: 'APP_TEMPLATE_SCAP',
    link: '/apps',
    hide: !enableAppStore(),
    metric: 'kubesphere_app_template_count',
  },
];

const getApi = () => `${monitorStore.apiVersion()}/kubesphere`;

const AdminDashboard = () => {
  const { isFetching, data } = useQuery('dashboard', () => {
    return monitorStore.fetchMetrics({
      metrics: Object.values(MetricTypes),
      getApiFn: getApi,
    });
  });

  const clusterCount = get(data, `${MetricTypes.cluster_count}.data.result[0].value[1]`);

  return (
    <Wrapper>
      <Card sectionTitle={t('PLATFORM_INFORMATION')} contentClassName="fields-card">
        <Field label={t('PLATFORM_VERSION')} value={get(globals, 'ksConfig.ksVersion')} />
        {isMultiCluster() ? (
          <Field
            label={clusterCount === '1' ? t('CLUSTER') : t('CLUSTER_PL')}
            value={clusterCount}
            as={Link}
            to="/clusters"
          />
        ) : (
          <Field label={t('CLUSTER')} value={1} as={Link} to="/clusters" />
        )}
      </Card>
      <Card
        sectionTitle={t('PLATFORM_RESOURCES')}
        contentClassName="stat-card"
        className="mt12"
        padding={0}
      >
        <StatTitle>
          <Field
            label={t('LAST_UPDATE_TIME')}
            avatar={<Blockchain size={40} />}
            value={formatTime(Date.now())}
          />
        </StatTitle>
        {resources.map(resource => {
          if (resource.hide) {
            return null;
          }
          const value = get(data, `${resource.metric}.data.result[0].value[1]`);
          return (
            <StatItem key={resource.name}>
              <Field
                as={Link}
                to={resource.link}
                label={value === '1' ? t(resource.name) : t(`${resource.name}_PL`)}
                avatar={resource.icon}
                value={value}
              />
            </StatItem>
          );
        })}
      </Card>
      <Card sectionTitle={t('RECENT_ACCESS')} className="mt12">
        <EmptyHistory>
          <Field label={t('NO_HISTORY_DESC')} value={t('NO_HISTORY_TITLE')} />
        </EmptyHistory>
      </Card>
      <LoadingOverlay visible={isFetching} />
    </Wrapper>
  );
};

export default AdminDashboard;
