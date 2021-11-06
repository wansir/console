import { RouteConfig } from 'react-router-config';
import { merge } from 'lodash';
import routes from '../routes';

type Plugin = {
  routes?: RouteConfig[];
  locales?: any;
};

export { Plugin };

export default class Context {
  public routes: RouteConfig[];

  public locales: Record<string, any>;

  constructor() {
    this.routes = routes;
    this.locales = {};
  }

  public registerPlugin = (plugin: Plugin) => {
    const { routes: pluginRoutes, locales } = plugin;
    if (pluginRoutes) {
      this.routes = this.routes.concat(pluginRoutes);
    }
    if (locales) {
      this.locales = merge(this.locales, locales);
    }
  };

  public registerPlugins = (plugins: Plugin[]) => {
    plugins.forEach(plugin => {
      this.registerPlugin(plugin);
    });
  };
}
