import { isUndefined } from 'lodash';
import clusters from '@ks-console/clusters';
import consoleApp from '@ks-console/console';
import apps from '@ks-console/apps';
import access from '@ks-console/access';
import platform from '@ks-console/platform';

const extensions: any[] = [];

const localExtensions = ['clusters', 'console', 'apps', 'access', 'platform'];

const localExtensionsMap = {
  clusters: clusters,
  console: consoleApp,
  apps: apps,
  access: access,
  platform,
} as { [key: string]: any };

if (isUndefined(__ENABLED_EXTENSIONS__)) {
  localExtensions.forEach(extension => {
    extensions.push(localExtensionsMap[extension]);
  });
} else {
  localExtensions.forEach(extension => {
    if (__ENABLED_EXTENSIONS__.includes(extension)) {
      extensions.push(localExtensionsMap[extension]);
    }
  });
}

export default extensions;
