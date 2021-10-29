import { RouteConfig } from 'react-router-config';
import routes from '../routes';

type Plugin = {
  routes: RouteConfig[];
};

export { Plugin };

export default class Context {
  public routes: RouteConfig[];

  constructor() {
    this.routes = routes;
  }

  public registerPlugin = (plugin: Plugin) => {
    const { routes: pluginRoutes } = plugin;
    this.routes = this.routes.concat(pluginRoutes);
  };

  public registerPlugins = (plugins: Plugin[]) => {
    plugins.forEach(plugin => {
      this.registerPlugin(plugin);
    });
  };
}
