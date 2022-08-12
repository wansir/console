import { devtools } from '@kubed/stook-devtools';
import { run, Context } from '@ks-console/core';
import extensions from './extensions';

globals.context = new Context();

// load local extension
globals.context.registerExtensions(extensions);

if (process.env.NODE_ENV === 'production') {
  run();
} else {
  globals.run = run;
  devtools.init();
}
