import React, { useState } from 'react';
import { Cluster, Refresh } from '@kubed/icons';
import {
  Banner,
  Button,
  FilterInput,
  Card,
  Empty,
  Text,
  Badge,
  Group,
  Loading,
} from '@kubed/components';
import { getActions } from '@ks-console/shared';
import { isEmpty } from 'lodash';
import { fetchList } from '../../stores/cluster';
import ClusterCard from '../../components/ClusterCard';

import { ClustersWrapper, Toolbar, Main, ClusterList } from './styles';

const Clusters = () => {
  const [name, setName] = useState('');
  const {
    isLoading: hostLoading,
    data: hostData = [],
    refresh: hostRefresh,
    reFetch: hostReFetch,
  } = fetchList({
    labelSelector: 'cluster-role.kubesphere.io/host=',
    limit: -1,
  });

  const {
    isLoading,
    data = [],
    refresh,
    total,
    reFetch,
  } = fetchList({
    labelSelector: '!cluster-role.kubesphere.io/host',
  });

  const enableActions = React.useMemo(() => {
    return getActions({ module: 'clusters' });
  }, []);

  const handleRefresh = () => {
    hostRefresh();
    refresh();
  };

  const handleSearch = (keyword: string) => {
    console.log('keyword', keyword);
    setName(keyword);
    reFetch({ name: keyword });
    hostReFetch({ name: keyword });
  };

  const renderToolbar = () => {
    return (
      <Toolbar>
        <FilterInput
          className="mr12 search-bar"
          placeholder={t('SEARCH_BY_NAME')}
          onChange={handleSearch}
          simpleMode
        />
        <Button variant="text" onClick={handleRefresh}>
          <Refresh />
        </Button>
        {enableActions.includes('create') ? (
          <Button color="secondary" shadow className="ml12 btn-add">
            {t('ADD_CLUSTER')}
          </Button>
        ) : null}
      </Toolbar>
    );
  };

  const noResultTitle = (
    <Group spacing="sm">
      <Text weight={600} size={14}>
        {t('Cluster List')}
      </Text>
      <Badge color="#abb4be">{total}</Badge>
    </Group>
  );

  const renderHost = () => (
    <ClusterList className="mb12">
      <div className="cluster-title">
        {hostData.length === 1 ? t('HOST_CLUSTER_TCAP') : t('HOST_CLUSTER_PL_TCAP')}
      </div>
      {hostData.map((item: any) => (
        <ClusterCard key={item.name} data={item} />
      ))}
    </ClusterList>
  );

  const renderClusters = () => (
    <ClusterList>
      <Group spacing="sm" className="mb8">
        <Text weight={600} size={14}>
          {t('Member Clusters')}
        </Text>
        <Badge color="#abb4be">{total}</Badge>
      </Group>
      {data.map((item: any) => (
        <ClusterCard key={item.name} data={item} className="mb12" />
      ))}
    </ClusterList>
  );

  const renderList = () => {
    if (isLoading || hostLoading) {
      return <Loading className="page-loading" />;
    }

    if (!isLoading && !hostLoading && !name && isEmpty(data) && isEmpty(hostData)) {
      return (
        <Card padding={32}>
          <Empty
            title={t('NO_CLUSTER_TIP')}
            description={t('NO_CLUSTER_TIP_DESC')}
            image={<Cluster size={48} />}
            imageClassName="empty-icon"
          >
            <Button color="secondary" shadow className="btn-add" style={{ marginTop: '20px' }}>
              {t('ADD_CLUSTER')}
            </Button>
          </Empty>
        </Card>
      );
    }

    if (!isLoading && !hostLoading && isEmpty(data) && isEmpty(hostData)) {
      return (
        <Card className="mt12" padding={32} sectionTitle={noResultTitle}>
          <Empty
            title={t('NO_RESOURCE_FOUND')}
            image={<img src="/assets/empty-card.svg" />}
            imageStyle={{ width: '100%', height: '100%', background: 'none' }}
          />
        </Card>
      );
    }

    return (
      <>
        {renderHost()}
        {renderClusters()}
      </>
    );
  };

  return (
    <ClustersWrapper>
      <Banner
        className="cluster-banner"
        icon={<Cluster />}
        title={t('Clusters Management')}
        description={t('CLUSTERS_MANAGE_DESC')}
      >
        {renderToolbar()}
      </Banner>
      <Main>{renderList()}</Main>
    </ClustersWrapper>
  );
};

export default Clusters;
