const Webpack = require('webpack');
const wds = require('webpack-dev-server');
const webpackDevConfig = require('../webpack/webpack.dev.conf');
const webpackProdConfig = require('../webpack/webpack.prod.conf');
const webpackDllConfig = require('../webpack/webpack.dll.conf');
const webpackPluginConfig = require('../webpack/webpack.plugin.conf');
const path = require('path');
const fs = require('fs-extra');

const resolve = dir => path.resolve(process.cwd(), dir);
const alias = {
  '@ks-console/shared': resolve('packages/shared/src'),
  '@ks-console/core': resolve('packages/core/src'),
  '@ks-console/console': resolve('packages/console/src'),
  '@ks-console/clusters': resolve('packages/clusters/src'),
  '@ks-console/apps': resolve('packages/apps/src'),
};

function devServer(setAlias) {
  if (setAlias === 'true') {
    webpackDevConfig.resolve.alias = {
      ...webpackDevConfig.resolve.alias,
      ...alias,
    };
  }
  process.env.NODE_ENV = 'development';
  const compiler = Webpack(webpackDevConfig);
  const devServerOptions = { ...webpackDevConfig.devServer };
  const server = new wds(devServerOptions, compiler);

  server.startCallback(() => {
    console.log('Successfully started server on http://localhost:8000');
  });
}

function runWebpack(config, env = 'production') {
  process.env.NODE_ENV = env || 'production';
  const compiler = Webpack(config);

  compiler.run((err, stats) => {
    if (err) {
      throw err;
    }

    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n',
    );

    console.log('  Webpack Finished\n');
  });
}

function buildProd() {
  runWebpack(webpackProdConfig);
}

function buildDll(setAlias) {
  const dllAlias = {
    '@ks-console/shared': resolve('packages/shared/src'),
  };
  if (setAlias === 'true') {
    webpackDllConfig.resolve.alias = {
      ...webpackDevConfig.resolve.alias,
      ...dllAlias,
    };
  }
  runWebpack(webpackDllConfig);
}

function buildPlugin(plugin) {
  const pluginSrcDir = path.resolve(process.cwd(), `plugins/${plugin}/src`);
  const entries = fs.readdirSync(pluginSrcDir).filter(function (file) {
    return file.match(/index\.[t,j]sx?$/);
  });
  if (entries.length < 1) {
    console.warn('error: plugin entry is empty');
    return;
  }

  webpackPluginConfig.entry.index = path.resolve(pluginSrcDir, entries[0]);
  webpackPluginConfig.output.path = path.resolve(process.cwd(), `plugins/${plugin}/dist`);
  runWebpack(webpackPluginConfig);
}

module.exports = {
  devServer,
  buildProd,
  buildDll,
  buildPlugin,
};
