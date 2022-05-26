const path = require('path');

const resolve = absolutePath => path.resolve(process.cwd(), absolutePath);

const rootDir = path.resolve(__dirname, '../');
const absResolve = absolutePath => path.resolve(rootDir, absolutePath);

const config = {
  siteTitle: 'ks-console',
  assetsPublicPath: '/',
  assetsRoot: resolve('dist'),
  distPath: resolve('dist'),
  distAssetsPath: resolve('dist/assets/'),
  assetsPath: absResolve('assets'),
  webIndex: absResolve('entry/index.ts'),
  resolve,
  absResolve,
  scope: '@ks-console',
};

const systemImports = {
  react: 'core:react',
  'react-dom': 'core:react-dom',
  'react-router-dom': 'core:react-router-dom',
  'react-query': 'core:react-query',
  'styled-components': 'core:styled-components',
  lodash: 'core:lodash',
  '@kubed/components': 'core:@kubed/components',
  '@kubed/hooks': 'core:@kubed/hooks',
  '@kubed/icons': 'core:@kubed/icons',
  '@ks-console/shared': 'core:@kubed/@ks-console/shared',
};

const locales = ['ar', 'en', 'es', 'fr', 'hi', 'ko', 'lt', 'pl', 'tc', 'tr', 'zh'];

module.exports = { config, systemImports, locales };
