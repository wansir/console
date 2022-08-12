import routes from './routes';

const menu = {
  parent: 'cluster',
  name: 'demo',
  title: 'Demo',
  icon: 'cluster',
  order: 0,
  desc: 'this is demo extension',
  skipAuth: true,
};

const extensionConfig = {
  routes,
  menus: [menu],
};

globals.context.registerExtension(extensionConfig);
