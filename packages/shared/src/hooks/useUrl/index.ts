import { get } from 'lodash';

import { Constants } from '../../constants';
import type { PathParams } from '../../types';
import { isMultiCluster } from '../../utils/checker';

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

export interface UseUrlOptions {
  getPathFn?: (params: any) => any;
  module: string;
}

export const useUrl = ({ getPathFn = getPath, module }: UseUrlOptions) => {
  const apiVersion = Constants.API_VERSIONS[module];

  const getResourceUrl = (params: PathParams = {}) => {
    return `kapis/resources.kubesphere.io/v1alpha3${getPathFn(params)}/${module}`;
  };

  const getWatchListUrl = (params: PathParams) => {
    return `${apiVersion}/watch${getPathFn(params)}/${module}`;
  };

  const getWatchUrl = (params: PathParams) => {
    return `${getWatchListUrl(params)}/${params.name}`;
  };

  const getListUrl = (params: PathParams) => {
    const { cluster, namespace, dryRun } = params;
    return `${apiVersion}${getPathFn({ cluster, namespace })}/${module}${
      dryRun ? '?dryRun=All' : ''
    }`;
  };

  const getDetailUrl = (params: PathParams) => {
    return `${getListUrl(params)}/${params.name}`;
  };

  const getDocsUrl = () => {
    const { url: prefix } = globals.config.documents;
    const docUrl = get(globals.config, `resourceDocs[${module}]`, '');

    if (!docUrl) {
      return '';
    }

    return `${prefix}${docUrl}`;
  };

  return {
    getPath: getPathFn,
    getClusterUrl,
    getResourceUrl,
    getWatchUrl,
    getListUrl,
    getDetailUrl,
    getDocsUrl,
  };
};
