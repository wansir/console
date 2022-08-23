import { merge, get } from 'lodash';
import { useUrl, useList, getOriginData, getRoleBaseInfo, parser } from '@ks-console/shared';
import type { UseListOptions } from '@ks-console/shared';

import type { GetPathParams } from '../../types';
import type { OriginalRole, FormatRoleKind } from './types';

const module = 'globalroles';

const { getPath } = useUrl({ module });

function getResourceUrl(params?: GetPathParams) {
  return `kapis/iam.kubesphere.io/v1alpha2${getPath(params)}/${module}`;
}

function formatRole(item: OriginalRole, kind: FormatRoleKind) {
  return {
    ...getRoleBaseInfo(item, kind),
    labels: get(item, 'metadata.labels', {}),
    namespace: get(item, 'metadata.namespace'),
    annotations: get(item, 'metadata.annotations'),
    dependencies: parser.safeParseJSON(
      get(item, 'metadata.annotations["iam.kubesphere.io/dependencies"]', ''),
      [],
    ),
    roleTemplates: parser.safeParseJSON(
      get(item, 'metadata.annotations["iam.kubesphere.io/aggregation-roles"]', ''),
      [],
    ),
    rules: get(item, 'rules'),
    _originData: getOriginData(item),
  };
}

function useRoles(options?: Omit<UseListOptions<OriginalRole>, 'url'>) {
  // TODO: missing params ?
  const url = getResourceUrl();
  const params = {
    annotation: 'kubesphere.io/creator',
  };
  const opts = merge(
    {},
    {
      url,
      params,
      format: (item: OriginalRole) => formatRole(item, module),
    },
    options,
  );

  return useList(opts);
}

export { getResourceUrl, formatRole, useRoles };
