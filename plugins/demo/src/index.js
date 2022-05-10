import routes from './routes';

const menu = {
  parent: 'topbar',
  name: 'demo',
  title: 'Demo',
  icon: 'cluster',
  order: 4,
  desc: 'this is demo plugin',
  skipAuth: true,
};

const pluginConfig = {
  routes,
  menus: [menu],
};
globals.context.registerPlugin(pluginConfig);
