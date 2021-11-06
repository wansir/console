const { config } = require('./config');
const WebpackBar = require('webpackbar');
const resolve = config.resolve;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

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
    modules: [
      resolve('plugins'),
      resolve('packages'),
      resolve('node_modules'),
    ],
    alias: {
      '@ks-console/shared': resolve('packages/shared/src'),
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
        include: [resolve('plugins'), resolve('packages')],
        options: {
          transpileOnly: true,
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
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${config.assetsPath}`, to: `${config.distAssetsPath}` }
      ]
    }),
    new WebpackBar({
      name: NODE_ENV || 'webpack-bar',
      color: 'green',
      profile: !isDev,
    }),
  ]
};
