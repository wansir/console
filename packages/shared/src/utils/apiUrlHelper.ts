export const getPath = ({ cluster, namespace }: { cluster?: string; namespace?: string }) => {
  let path = '';
  if (cluster) {
    path += `/klusters/${cluster}`;
  }
  if (namespace) {
    path += `/namespaces/${namespace}`;
  }
  return path;
};

export type ParamsType = {
  cluster?: string;
  namespace?: string;
  apiVersion: string;
  module: string;
  dryRun?: boolean;
  name?: string;
};

export const getListUrl = (params: ParamsType) => {
  const { apiVersion, module, cluster, namespace, dryRun } = params;
  return `${apiVersion}${getPath({ cluster, namespace })}/${module}${dryRun ? '?dryRun=All' : ''}`;
};

export const getDetailUrl = (params: ParamsType) => {
  return `${getListUrl(params)}/${params.name}`;
};

export const getWatchListUrl = (params: ParamsType) => {
  const { apiVersion, module } = params;
  return `${apiVersion}/watch${getPath(params)}/${module}`;
};

export const getWatchUrl = (params: ParamsType) => {
  return `${getWatchListUrl(params)}/${params.name}`;
};

export const getResourceUrl = (params: ParamsType) => {
  return `kapis/resources.kubesphere.io/v1alpha3${getPath(params)}/${params.module}`;
};
