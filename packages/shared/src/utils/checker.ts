import { get } from 'lodash';

export const isSystemRole = (role: string) => /^system:/.test(role);

export const isPlatformAdmin = (): boolean => globals.user.globalrole === 'platform-admin';

export const isMultiCluster = (): boolean => !!globals.ksConfig?.multicluster;

export const hasKSModule = (module: string) => {
  return get(globals, `ksConfig["${module}"]`);
};

export const enableAppStore = () => {
  return hasKSModule('openpitrix.appstore');
};

/**
 * Check if the page is apps page.
 * @param {String} path
 */
export const isAppsPage = (path = location.pathname) =>
  path === '/apps' || path.startsWith('/apps/app-');

export const isComponentsPage = (path = location.pathname) =>
  path === '/components' || path.startsWith('/components/component-');

export const isDarkHeader = (path = location.pathname) => {
  return isAppsPage(path) || isComponentsPage(path);
};

export const isMemberClusterPage = (path = location.pathname, message: string) => {
  const clusterName = get(/\/clusters\/?([-0-9a-z]*)\/?/.exec(path), '1', 'host');
  const rules = ['token used before issued', 'signature is invalid', 'token not found in cache'];
  const lowerMessage = message.toLowerCase();

  let isTokenOut = true;

  rules.forEach(item => {
    if (lowerMessage.indexOf(item) > -1) {
      isTokenOut = false;
    }
  });

  return clusterName !== 'host' && !isTokenOut;
};

export const compareVersion = (v1 = '', v2 = '') => {
  const getVersion = (str: string) =>
    str
      .split('-')[0]
      .replace('v', '')
      .split('.')
      .map(item => parseInt(item, 10));

  const v1s = getVersion(v1);
  const v2s = getVersion(v2);

  const len = Math.min(v1s.length, v2s.length);
  let i = 0;
  while (i < len) {
    if (v1s[i] < v2s[i]) {
      return -1;
    }
    if (v1s[i] > v2s[i]) {
      return 1;
    }
    i++;
  }

  if (v1s.length < v2s.length) {
    return -1;
  }

  if (v1s.length > v2s.length) {
    return 1;
  }

  return 0;
};
