import { isUndefined } from 'lodash';
import clusters from '@ks-console/clusters';
import consoleApp from '@ks-console/console';
import platform from '@ks-console/platform';
import apps from '@ks-console/apps';

const plugins: any[] = [];

const localPlugins = ['clusters', 'console', 'apps', 'platform'];

const localPluginsMap = {
  clusters: clusters,
  console: consoleApp,
  platform: platform,
  apps: apps,
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
