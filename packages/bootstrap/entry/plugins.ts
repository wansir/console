import clusters from '@ks-console/clusters';
import console from '@ks-console/console';
import apps from '@ks-console/apps';

const plugins: any[] = [];

const enabledPlugins = ['clusters', 'console', 'apps'];

if (enabledPlugins.includes('clusters')) {
  plugins.push(clusters);
}
if (enabledPlugins.includes('console')) {
  plugins.push(console);
}
if (enabledPlugins.includes('apps')) {
  plugins.push(apps);
}

export default plugins;
