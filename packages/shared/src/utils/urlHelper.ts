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

export const getClusterUrl = (url: string): string => {
  let requestURL = url;

  const reg = new RegExp(/\/(api|apis|kapis)\/(.*)\/?(klusters\/[^/]*)\/(.*)/);
  const match = requestURL.match(reg);

  if (match && match.length === 5) {
    requestURL = globals.app.isMultiCluster
      ? `/${match[1]}/${match[3].replace('klusters', 'clusters')}/${match[2]}/${match[4]}`
      : `/${match[1]}/${match[2]}/${match[4]}`;
  }

  return requestURL.replace(/\/\/+/, '/');
};
