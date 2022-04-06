const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const {config: configShared} = require('./config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const resolveShared = configShared.resolve;

const resolve = dir => path.join(__dirname, '../dist', dir);

const config = {
  devtool: false,
  mode: 'production',
  entry: {
    common: [
      'react',
      'react-is',
      'react-dom',
      'react-router-dom',
      'react-query',
      'lodash',
      '@kubed/components',
      '@kubed/hooks',
      '@kubed/icons',
      '@ks-console/shared',
      'styled-components',
    ],
  },
  output: {
    path: resolve('dll'),
    filename: '[name].dll.js',
    library: '[name]',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.ts', '.tsx', '.json'],
    // modules: [
    //   resolve('plugins'),
    //   resolve('packages'),
    //   resolve('node_modules'),
    // ],
    alias: {
      '@ks-console/shared': resolveShared('packages/shared/src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [resolveShared('shared'), resolveShared('packages')],
        options: {
          cacheDirectory: true,
          // plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [resolveShared('shared'), resolveShared('packages')],
        options: {
          transpileOnly: true,
          // getCustomTransformers,
          // plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
        },
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 2,
      //       },
      //     },
      //   ],
      // },
    ]
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
