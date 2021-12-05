import type { RouteObject } from 'react-router-dom';
import { merge } from 'lodash';
// import routes from '../routes';

type Plugin = {
  routes?: RouteObject[];
  locales?: any;
};

export { Plugin };

export default class Context {
  public routes: RouteObject[];

  public locales: Record<string, any>;

  constructor() {
    this.routes = [];
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
