const { config } = require('./config');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';
const styledComponentsTransformer = createStyledComponentsTransformer();
const getCustomTransformers = isDev ? () => ({ before: [styledComponentsTransformer] }) : {};

const { resolve } = config;

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
    modules: [resolve('plugins'), resolve('packages'), 'node_modules'],
    alias: {
      // '@ks-console/shared': resolve('packages/shared/src'),
      // '@ks-console/core': resolve('packages/core/src'),
      // '@ks-console/console': resolve('packages/console/src'),
      // '@ks-console/clusters': resolve('packages/clusters/src'),
      // '@ks-console/apps': resolve('packages/apps/src'),
      'styled-components': resolve('node_modules/styled-components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [resolve('plugins'), resolve('packages')],
        options: {
          cacheDirectory: true,
          plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [resolve('plugins'), resolve('packages'), resolve('node_modules')],
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
    new WebpackBar({
      name: NODE_ENV || 'webpack-bar',
      color: 'green',
      profile: !isDev,
    }),
  ],
};
