import { isUndefined } from 'lodash';
import clusters from '@ks-console/clusters';
import consoleApp from '@ks-console/console';
import apps from '@ks-console/apps';
import access from '@ks-console/access';

const plugins: any[] = [];

const localPlugins = ['clusters', 'console', 'apps', 'access'];

const localPluginsMap = {
  clusters: clusters,
  console: consoleApp,
  apps: apps,
  access: access,
} as { [key: string]: any };

if (isUndefined(__ENABLED_PLUGINS__)) {
  localPlugins.forEach(plugin => {
    plugins.push(localPluginsMap[plugin]);
  });
} else {
  localPlugins.forEach(plugin => {
    if (__ENABLED_PLUGINS__.includes(plugin)) {
      plugins.push(localPluginsMap[plugin]);
    }
  });
}

export default plugins;
