import { get } from 'lodash';

import { isMultiCluster } from './checker';
import type { PathParams } from '../types';

export const getPath = ({
  cluster,
  workspace,
  namespace,
  devops,
}: { cluster?: string; workspace?: string; namespace?: string; devops?: string } = {}) => {
  let path = '';

  if (cluster) {
    path += `/klusters/${cluster}`;
  }

  if (namespace) {
    return `${path}/namespaces/${namespace}`;
  }

  if (devops) {
    return `${path}/devops/${devops}`;
  }

  if (workspace) {
    return `/workspaces/${workspace}`;
  }

  return path;
};

export const getListUrl = (params: PathParams) => {
  const { apiVersion, module, cluster, namespace, dryRun } = params;
  return `${apiVersion}${getPath({ cluster, namespace })}/${module}${dryRun ? '?dryRun=All' : ''}`;
};

export const getDetailUrl = (params: PathParams) => {
  return `${getListUrl(params)}/${params.name}`;
};

export const getWatchListUrl = (params: PathParams) => {
  const { apiVersion, module } = params;
  return `${apiVersion}/watch${getPath(params)}/${module}`;
};

export const getWatchUrl = (params: PathParams) => {
  return `${getWatchListUrl(params)}/${params.name}`;
};

export const getResourceUrl = (params: PathParams) => {
  return `kapis/resources.kubesphere.io/v1alpha3${getPath(params)}/${params.module}`;
};

export const getClusterUrl = (url: string): string => {
  let requestURL = url;

  const reg = new RegExp(/\/(api|apis|kapis)\/(.*)\/?(klusters\/[^/]*)\/(.*)/);
  const match = requestURL.match(reg);

  if (match && match.length === 5) {
    requestURL = isMultiCluster()
      ? `/${match[1]}/${match[3].replace('klusters', 'clusters')}/${match[2]}/${match[4]}`
      : `/${match[1]}/${match[2]}/${match[4]}`;
  }

  return requestURL.replace(/\/\/+/, '/');
};

export const getWebsiteUrl = () => {
  const useLang = get(globals, 'user.lang', 'en');
  const lang = useLang === 'zh' ? 'zh' : 'en';
  return globals.config.documents[lang];
};

export const getDocsUrl = (module: any) => {
  const { url: prefix } = getWebsiteUrl();
  const docUrl = get(globals.config, `resourceDocs[${module}]`, '');

  if (!docUrl) {
    return '';
  }

  return `${prefix}${docUrl}`;
};
