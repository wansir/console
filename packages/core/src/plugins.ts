import { Plugin } from './libs/Context';

const context = require.context('../../', true, /(?<!core|components|shared)\/src\/index.[jt]s$/);
const plugins: Plugin[] = [];
context
  .keys()
  .filter(k => k.startsWith('.'))
  .forEach(key => {
    plugins.push(context(key).default);
  });

export default plugins;
