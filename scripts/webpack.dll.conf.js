const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const resolve = dir => path.join(__dirname, '../dist', dir);

const config = {
  devtool: false,
  mode: 'production',
  entry: {
    common: [
      'react',
      'react-is',
      'react-dom',
      'react-router',
      'react-router-dom',
      'react-query',
      'styled-components',
      // 'axios',
      // 'echarts',
      'lodash',
    ],
  },
  output: {
    path: resolve('dll'),
    filename: '[name].dll.js',
    library: '[name]',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
    ],
  },
  plugins: [
    new WebpackBar({
      name: 'build dll',
      color: 'green',
      profile: true,
    }),
    new CleanWebpackPlugin({
      root: resolve('dll'),
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false,
    }),
    new webpack.DllPlugin({
      path: resolve('dll/[name]-manifest.json'),
      name: '[name]',
    }),
  ],
  stats: {
    assetsSort: '!size',
    children: false,
    chunks: false,
    colors: true,
    entrypoints: false,
    modules: false,
  },
};

if (process.env.npm_config_report) {
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 3002 }));
}

module.exports = config;
