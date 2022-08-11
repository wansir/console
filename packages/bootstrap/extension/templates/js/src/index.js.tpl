import routes from './routes';
import locales from './locales';

const menu = {
  parent: 'topbar',
  name: '{{extensionName}}',
  title: '{{displayName}}',
  icon: 'cluster',
  order: 0,
  desc: '{{description}}',
  skipAuth: true,
};

const pluginConfig = {
  routes,
  menus: [menu],
  locales,
};
globals.context.registerPlugin(pluginConfig);
