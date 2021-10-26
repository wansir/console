const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SystemJSPublicPathWebpackPlugin = require("systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin");

module.exports = {
  entry: {
    index: './src/index.js',
  },
  mode: 'production',
  output: {
    filename: '[name].js',
    library: {
      type: 'system',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          rootMode: 'upward',
          // plugins: ['@babel/plugin-transform-modules-systemjs']
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
        ],
      },    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          mangle: true,
          safari10: true,
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css',
    }),
    new SystemJSPublicPathWebpackPlugin({
      // optional: defaults to 1
      // If you need the webpack public path to "chop off" some of the directories in the current module's url, you can specify a "root directory level". Note that the root directory level is read from right-to-left, with `1` indicating "current directory" and `2` indicating "up one directory":
      rootDirectoryLevel: 1,

      // ONLY NEEDED FOR WEBPACK 1-4. Not necessary for webpack@5
      // systemjsModuleName: "@org-name/project-name"
    })
  ],
  externals: ['react', 'react-dom', 'react-router', 'react-router-dom', '@geist-ui/react', 'styled-components'],
};
