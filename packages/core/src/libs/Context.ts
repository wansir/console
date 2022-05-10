import type { RouteObject } from 'react-router-dom';
import { merge } from 'lodash';
// import routes from '../routes';

export interface PluginMenu {
  parent: string;
  name: string;
  title: string;
  icon?: string;
  order?: number;
  desc?: string;
  skipAuth?: boolean;
  children?: PluginMenu[];
}

type Plugin = {
  routes?: RouteObject[];
  locales?: any;
  menus?: PluginMenu[];
};

export { Plugin };

export default class Context {
  public routes: RouteObject[];

  public locales: Record<string, any>;

  constructor() {
    this.routes = [];
    this.locales = {};
  }

  private arrayInsert(array: any[], item: any, index?: number) {
    if (index === undefined) {
      index = array.length;
    }
    array.splice(index, 0, item);
  }

  private arrayUpdate(array: any[], item: any, index: number) {
    array.splice(index, 1, item);
  }

  private registerMenu(menus: PluginMenu[]) {
    const { config: globalConfig } = globals;
    menus.forEach((menu: PluginMenu) => {
      const { parent, name, order } = menu;
      if (!parent) {
        const menuScope = `${name}Navs`;
        globalConfig[menuScope] = menu;
      } else {
        const parents = parent.split('.');
        const topScope = `${parents[0]}Navs`;
        const length = parents.length;

        if (!globalConfig[topScope]) {
          console.warn(`Parent menu${topScope} is not defined`);
        } else {
          if (length === 1) {
            const children = globalConfig[topScope].children;
            const existMenuIndex = children.findIndex((item: any) => item.name === name);
            if (existMenuIndex > -1) {
              this.arrayUpdate(children, menu, existMenuIndex);
            } else {
              this.arrayInsert(children, menu, order);
            }
          }
          if (length === 2) {
            const existParentIndex = globalConfig[topScope].children.findIndex(
              (item: any) => item.name === parents[1],
            );
            if (existParentIndex < 0) {
              console.warn(`Parent menu ${parents[1]} is not defined`);
            } else {
              const children = globalConfig[topScope].children[existParentIndex].children;
              const existMenuIndex = children.findIndex((item: any) => item.name === name);

              if (existMenuIndex > -1) {
                this.arrayUpdate(children, menu, existMenuIndex);
              } else {
                this.arrayInsert(children, menu, order);
              }
            }
          }
        }
      }
    });
  }

  private registerRoutes(routes: any) {
    routes.forEach((route: any) => {
      const { parentRoute } = route;
      const parentRouteIndex = this.routes.findIndex((item: any) => item.path === parentRoute);
      if (parentRouteIndex > -1) {
        // @ts-ignore
        this.arrayInsert(this.routes[parentRouteIndex].children[0].children, route, 0);
      } else {
        this.arrayInsert(this.routes, route, 0);
      }
    });
  }

  public registerPlugin = (plugin: Plugin) => {
    const { routes: pluginRoutes, locales, menus } = plugin;
    if (pluginRoutes) {
      this.registerRoutes(pluginRoutes);
    }
    if (locales) {
      this.locales = merge(this.locales, locales);
    }
    if (menus) {
      this.registerMenu(menus);
    }
  };

  public registerPlugins = (plugins: Plugin[]) => {
    plugins.forEach(plugin => {
      this.registerPlugin(plugin);
    });
  };
}
