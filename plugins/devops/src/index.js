import routes from './routes';
import locales from './locales';

const pluginConfig = {
  routes,
  locales,
};
globals.context.registerPlugin(pluginConfig);
