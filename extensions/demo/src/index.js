import routes from './routes';

const menu = {
  parent: 'cluster',
  name: 'demo',
  title: 'Demo',
  icon: 'cluster',
  order: 0,
  desc: 'this is demo plugin',
  skipAuth: true,
};

const pluginConfig = {
  routes,
  menus: [menu],
};
globals.context.registerPlugin(pluginConfig);
