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
  "react-router-dom": "core:react-router-dom",
  "styled-components": "core:styled-components",
  "lodash": "core:lodash",
  "@kubed/components": "core:@kubed/components",
  "@kubed/hooks": "core:@kubed/hooks",
  "@kubed/icons": "core:@kubed/icons",
  "@ks-console/shared": "core:@kubed/@ks-console/shared",
}

const locales = ['en', 'es', 'tc', 'zh'];

module.exports = { config, systemImports, locales };
