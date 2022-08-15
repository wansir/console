import { cloneDeep, isEmpty } from 'lodash';
import { checkNavItem, hasPermission } from '@ks-console/shared';

export function getPlatformSettingsNavs() {
  const navs = [];
  const platformSettingsNavs = cloneDeep(globals.config.platformSettingsNavs);
  const filteredItems = platformSettingsNavs.children.filter((item: any) => {
    return checkNavItem(item, params => hasPermission({ ...params }));
  });
  if (!isEmpty(filteredItems)) {
    navs.push({ ...platformSettingsNavs, items: filteredItems });
  }
  return navs;
}
