import {
  request,
  Constants,
  getBaseInfo,
  getOriginData,
  urlHelper,
  PathParams,
  isMultiCluster,
} from '@ks-console/shared';
import { keyBy, get, has, cloneDeep } from 'lodash';

export const clusterMapper = (item: any) => {
  const conditions = keyBy(get(item, 'status.conditions', []), 'type');
  const configz = get(item, 'status.configz', {});
  configz.ksVersion = get(item, 'status.kubeSphereVersion', '');

  return {
    ...getBaseInfo(item),
    conditions,
    configz,
    provider: get(item, 'spec.provider'),
    isHost: has(get(item, 'metadata.labels', {}), 'cluster-role.kubesphere.io/host'),
    kkName: get(item, 'metadata.labels["kubekey.kubesphere.io/name"]', ''),
    nodeCount: get(item, 'status.nodeCount'),
    kubernetesVersion: get(item, 'status.kubernetesVersion'),
    labels: get(item, 'metadata.labels'),
    group: get(item, 'metadata.labels["cluster.kubesphere.io/group"]', ''),
    isReady: isMultiCluster() ? get(conditions, 'Ready.status') === 'True' : true,
    visibility: get(item, 'metadata.labels["cluster.kubesphere.io/visibility"]'),
    connectionType: get(item, 'spec.connection.type'),
    _originData: getOriginData(item),
  };
};

export const fetchDetail = async (params: PathParams) => {
  let detail;

  if (!isMultiCluster()) {
    detail = clusterMapper(cloneDeep(Constants.DEFAULT_CLUSTER));
  } else {
    params.module = 'clusters';
    const url = `${urlHelper.getResourceUrl(params)}/${params.name}`;
    const result = await request(url);

    detail = { ...params, ...clusterMapper(result) };
  }

  return detail;
};
