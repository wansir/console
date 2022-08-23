import { get, uniq, isEmpty, includes } from 'lodash';
import { isMultiCluster, isPlatformAdmin, compareVersion } from './checker';

const hasKSModule = (module: string) => {
  return get(globals, `ksConfig["${module}"]`);
};

export const hasClusterModule = (cluster: string, module: string) => {
  if (isMultiCluster()) {
    return hasKSModule(module);
  }
  return get(globals, `clusterConfig.${cluster}["${module}"]`);
};

export const checkNavItem = (item: any, callback: (params: any) => any) => {
  if (item.multiCluster && isMultiCluster()) {
    return false;
  }

  if (item.ksModule && !hasKSModule(item.ksModule)) {
    return false;
  }

  if (
    item.clusterModule &&
    item.clusterModule.split('|').every((cm: string) => !hasClusterModule(item.cluster, cm))
  ) {
    return false;
  }

  if (item.admin && !isPlatformAdmin()) {
    return false;
  }

  if (item.skipAuth) {
    return true;
  }

  if (!item._children) {
    item._children = item.children;
  }

  if (item._children) {
    item.children = item._children.filter((child: any) => {
      const { cluster } = item;
      if (child.tabs) {
        return child.tabs.some((_child: any) => {
          _child.cluster = cluster;
          return checkNavItem(_child, callback);
        });
      }
      child.cluster = cluster;
      return checkNavItem(child, callback);
    });

    delete item._children;

    return item.children.length > 0;
  }

  if (item.authKey && item.authKey.indexOf('|') !== -1) {
    return item.authKey.split('|').some((module: any) => callback({ module, action: 'view' }));
  }

  return callback({
    module: item.authKey || item.name,
    action: item.authAction || 'view',
  });
};

interface GetActionParams {
  project?: string;
  cluster?: string;
  module?: string;
  devops?: string;
  workspace?: string;
}

export const getActions = ({
  project,
  cluster,
  module,
  devops,
  workspace,
}: GetActionParams): string[] => {
  if (globals.config.disableAuthorization) {
    return ['view', 'edit', 'create', 'delete', 'manage'];
  }

  const adapter = (arr: string[]) => {
    if (arr.includes('manage')) {
      return uniq([...arr, 'view', 'edit', 'create', 'delete']);
    }
    return arr;
  };

  if (project) {
    const defaultActions = get(
      globals.user,
      `projectRules[${cluster}][${project}]._`,
      getActions({ cluster, module }),
    );
    return adapter([
      ...get(globals.user, `projectRules[${cluster}][${project}][${module}]`, []),
      ...defaultActions,
    ]);
  }

  if (devops) {
    const defaultActions = get(globals.user, `devopsRules[${cluster}][${devops}]._`, []);
    return adapter([
      ...get(globals.user, `devopsRules[${cluster}][${devops}][${module}]`, []),
      ...defaultActions,
    ]);
  }

  if (workspace) {
    const defaultActions = get(globals.user, `workspaceRules[${workspace}]._`, []);
    return adapter([
      ...get(globals.user, `workspaceRules[${workspace}][${module}]`, []),
      ...defaultActions,
    ]);
  }

  if (cluster) {
    const defaultActions = get(globals.user, `clusterRules[${cluster}]._`, []);
    return adapter([
      ...get(globals.user, `clusterRules[${cluster}][${module}]`, []),
      ...defaultActions,
    ]);
  }

  return adapter(get(globals.user, `globalRules[${module}]`, []));
};

interface HasPermissionParams extends GetActionParams {
  action?: string;
  actions?: string[];
}

export const hasPermission = ({
  cluster,
  workspace,
  project,
  devops,
  module,
  action,
  actions,
}: HasPermissionParams) => {
  if (globals.config.disableAuthorization) {
    return true;
  }

  if (!isEmpty(actions)) {
    // @ts-ignore
    return includes(getActions({ cluster, workspace, project, devops, module }), ...actions);
  }

  return getActions({
    cluster,
    workspace,
    project,
    devops,
    module,
    // @ts-ignore
  }).includes(action);
};

export const checkClusterVersionRequired = (navs: any[], cluster: string) => {
  const ksVersion = isMultiCluster()
    ? get(globals, `clusterConfig.${cluster}.ksVersion`)
    : get(globals, 'ksConfig.ksVersion');

  navs.forEach(item => {
    if (item.requiredClusterVersion && compareVersion(ksVersion, item.requiredClusterVersion) < 0) {
      item.disabled = true;
      item.reason = 'CLUSTER_UPGRADE_REQUIRED';
    }

    if (item.children && item.children.length > 0) {
      checkClusterVersionRequired(item.children, cluster);
    }
  });
};
