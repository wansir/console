import { get } from 'lodash';

export const isSystemRole = (role: string) => /^system:/.test(role);

export const isPlatformAdmin = () => globals.user.globalrole === 'platform-admin';

/**
 * Check if the page is apps page.
 * @param {String} path
 */
export const isAppsPage = (path = location.pathname) =>
  path === '/apps' || path.startsWith('/apps/app-');

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
