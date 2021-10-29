import Context from './libs/Context';
import run from './run';

window.globals.context = new Context();

if (process.env.NODE_ENV === 'production') {
  run();
} else {
  window.globals.run = run;
}
