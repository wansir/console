import { useUrl } from '@ks-console/shared';

import type { GetPathParams } from '../../types';

const module = 'users';

const { getPath } = useUrl({ module });

function getModule(params?: GetPathParams) {
  const cluster = params?.cluster;
  const workspace = params?.workspace;
  const namespace = params?.namespace;
  const devops = params?.devops;

  if (namespace || devops) {
    return 'members';
  }

  if (workspace) {
    return 'workspacemembers';
  }

  if (cluster) {
    return 'clustermembers';
  }

  return 'users';
}

export function getResourceUrl(params?: GetPathParams) {
  return `kapis/iam.kubesphere.io/v1alpha2${getPath(params)}/${getModule(params)}`;
}
