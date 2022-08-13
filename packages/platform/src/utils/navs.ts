import { get, cloneDeep } from 'lodash';

export function getPlatformSettingsNavs() {
  const platformSettingsNavs = cloneDeep(globals.config.platformSettingsNavs);

  return [{ ...platformSettingsNavs }];
}

export function getNotificationManagementNav() {
  const platformSettingsNavs = getPlatformSettingsNavs().pop();
  const notificationManagementNavs = platformSettingsNavs.children.find((item: any) => {
    return item.name === 'notification-management';
  });

  return cloneDeep(notificationManagementNavs);
}

export function getNotificationConfigurationTabs() {
  const notificationManagementNav = getNotificationManagementNav();
  const tabs: Array<any> = get(notificationManagementNav, 'children', []).pop().tabs;

  return tabs;
}
