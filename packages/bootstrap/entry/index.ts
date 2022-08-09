import { devtools } from '@kubed/stook-devtools';
import { run, Context } from '@ks-console/core';
import plugins from './plugins';

globals.context = new Context();

// load local plugin
globals.context.registerPlugins(plugins);

if (process.env.NODE_ENV === 'production') {
  run();
} else {
  globals.run = run;
  devtools.init();
}
