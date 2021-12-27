import { devtools } from '@kubed/stook-devtools';
import Context from './libs/Context';
import run from './run';

globals.context = new Context();

if (process.env.NODE_ENV === 'production') {
  run();
} else {
  globals.run = run;
  devtools.init();
}
