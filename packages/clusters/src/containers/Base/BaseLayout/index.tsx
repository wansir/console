import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useQueries } from 'react-query';
import { useStore } from '@kubed/stook';
import { Loading } from '@kubed/components';
import { apis } from '@ks-console/shared';
import { fetchDetail } from '../../../stores/cluster';

const BaseLayout = () => {
  const { cluster } = useParams();
  const [, setCluster] = useStore('cluster');

  const result = useQueries([
    {
      queryKey: ['clusters', cluster],
      queryFn: () => {
        return fetchDetail({ name: cluster });
      },
      onSuccess: (data: any) => {
        setCluster(data);
      },
    },
    {
      queryKey: ['authRule', cluster],
      queryFn: () => {
        return apis.fetchRules({ cluster, name: globals.user.username });
      },
      keepPreviousData: true,
    },
  ]);

  console.log(result);
  if (result[0].isLoading || result[1].isLoading) {
    return <Loading className="page-loading" />;
  }

  return <Outlet />;
};

export default BaseLayout;
