import { get, cloneDeep } from 'lodash';

import type { NavItem } from '../types';

export function getPlatformSettingsNavs(): Array<NavItem> {
  const platformSettingsNavs: NavItem = cloneDeep(globals.config.platformSettingsNavs);

  return [{ ...platformSettingsNavs }];
}

export function getNotificationManagementNav(): NavItem | undefined {
  const platformSettingsNavs = getPlatformSettingsNavs().pop();
  const notificationManagementNavs: NavItem | undefined = platformSettingsNavs?.children?.find(
    ({ name }: NavItem) => {
      return name === 'notification-management';
    },
  );

  return notificationManagementNavs;
}

export function getNotificationConfigurationTabs(): Array<NavItem> {
  const notificationManagementNav = getNotificationManagementNav();
  const tabs: Array<NavItem> = get(notificationManagementNav ?? {}, 'children[0].tabs', []);

  return tabs;
}
