const { config } = require('./config');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const fs = require('fs-extra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';
const styledComponentsTransformer = createStyledComponentsTransformer();
const getCustomTransformers = isDev ? () => ({ before: [styledComponentsTransformer] }) : {};

const { resolve } = config;

const configFile = fs.pathExistsSync(resolve('configs/console.config.js'));
const configs = configFile ? require(resolve('configs/console.config.js')) : {};

module.exports = {
  entry: {
    main: config.webIndex,
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.ts', '.tsx', '.json'],
    modules: [resolve('extensions'), resolve('packages'), 'node_modules'],
    alias: {
      'styled-components': resolve('node_modules/styled-components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [resolve('extensions'), resolve('packages')],
        options: {
          cacheDirectory: true,
          plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [resolve('extensions'), resolve('packages'), resolve('node_modules')],
        options: {
          transpileOnly: true,
          getCustomTransformers,
          // plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
        },
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: `${config.assetsPath}`, to: `${config.distAssetsPath}` }],
    }),
    new webpack.DefinePlugin({
      __ENABLED_EXTENSIONS__: JSON.stringify(configs.enabledExtensions),
    }),
    new WebpackBar({
      name: NODE_ENV || 'webpack-bar',
      color: 'green',
      profile: !isDev,
    }),
  ],
};
