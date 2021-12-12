import { omit, get, isEmpty } from 'lodash';

export const getServedVersion = (item: any) => {
  const versions = get(item, 'spec.versions', []);
  if (versions.length === 0) {
    return '';
  }
  let servedVersion = get(versions[versions.length - 1], 'name');
  versions.some((ver: any) => {
    if (get(ver, 'served', false)) {
      servedVersion = get(ver, 'name', servedVersion);
      return true;
    }
    return false;
  });
  return servedVersion;
};

export const getResourceCreator = (item: any) =>
  get(item, 'metadata.annotations["kubesphere.io/creator"]') ||
  get(item, 'metadata.annotations.creator') ||
  '';

export const getDescription = (item: any) =>
  get(item, 'metadata.annotations["kubesphere.io/description"]') ||
  get(item, 'metadata.annotations.desc') ||
  '';

export const getAliasName = (item: any) =>
  get(item, 'metadata.annotations["kubesphere.io/alias-name"]') ||
  get(item, 'metadata.annotations.displayName') ||
  '';

export const getDisplayName = (item: any) => {
  if (isEmpty(item)) {
    return '';
  }

  if (item.display_name) {
    return item.display_name;
  }

  return `${item.name}${item.aliasName ? `(${item.aliasName})` : ''}`;
};

export const getOriginData = (item: any) =>
  omit(item, [
    'status',
    'metadata.uid',
    'metadata.selfLink',
    'metadata.generation',
    'metadata.ownerReferences',
    'metadata.resourceVersion',
    'metadata.creationTimestamp',
    'metadata.managedFields',
  ]);

export const getBaseInfo = (item: any) => ({
  uid: get(item, 'metadata.uid'),
  name: get(item, 'metadata.name'),
  creator: getResourceCreator(item),
  description: getDescription(item),
  aliasName: getAliasName(item),
  createTime: get(item, 'metadata.creationTimestamp', ''),
  resourceVersion: get(item, 'metadata.resourceVersion'),
  isFedManaged: get(item, 'metadata.labels["kubefed.io/managed"]') === 'true',
});
