const path = require('path');

const resolve = (absolutePath) => path.resolve(process.cwd(), absolutePath);

const config = {
  siteTitle: 'ks-console',
  assetsPublicPath: '/',
  assetsRoot: resolve('dist'),
  distPath: resolve('dist'),
  distAssetsPath: resolve('dist/assets/'),
  assetsPath: resolve('packages/core/src/assets'),
  webIndex: resolve('packages/core/src/index.ts'),
  jsPath: resolve('dist/js'),
  cssPath: resolve('dist/css'),
  resolve,
  scope: '@ks-console'
};

const systemImports = {
  "react": "core:react",
  "react-dom": "core:react-dom",
  "react-router": "core:react-router",
  "react-router-dom": "core:react-router-dom",
  "styled-components": "core:styled-components",
  "@kubed/components": "core:@kubed/components",
}

module.exports = { config, systemImports };
