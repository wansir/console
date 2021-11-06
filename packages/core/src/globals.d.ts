interface Globals {
  app?: any;
  config?: any;
  installedPlugins?: any;
  context?: any;
  run?: any;
  user?: any;
  manifest?: Record<string, string>;
}

interface Window {
  globals: Globals;
  t: any;
}

declare var t: any;
declare var globals: any;
