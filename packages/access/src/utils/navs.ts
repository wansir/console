import { cloneDeep, isEmpty } from 'lodash';
import { checkNavItem, hasPermission } from '@ks-console/shared';

export function getAccessNavs() {
  const navs = [];
  const accessNavs = cloneDeep(globals.config.accessNavs);
  const filteredItems = accessNavs.children.filter((item: any) => {
    return checkNavItem(item, params => hasPermission({ ...params }));
  });
  if (!isEmpty(filteredItems)) {
    navs.push({ ...accessNavs, items: filteredItems });
  }
  return navs;
}
