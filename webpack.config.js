const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

// Plguins
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// Utils
const aliases = require('./build-utils/aliases');
const presetConfig = require('./build-utils/loadPresets');
const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env); // eslint-disable-line
const staticFiles = require('./build-utils/staticFiles');

module.exports = ({
  mode = 'production',
  presets = ['babel', 'css', 'svg'],
}) => (
  webpackMerge.merge(
    {
      mode,
      entry: {
        background: [path.join(__dirname, './src/background/background.js')],
        content: [path.join(__dirname, './src/content/content.js')],
        'popup/popup': [path.join(__dirname, './src/popup/popup.js')],
      },
      resolve: {
        alias: aliases,
        extensions: ['*', '.js', '.jsx'],
      },
      plugins: [
        new Dotenv(),
        new webpack.DefinePlugin({
          global: 'window',
        }),
        new HtmlWebpackPlugin({
          title: 'Popup',
          chunks: ['popup/popup'],
          filename: 'popup/popup.html',
          template: path.join(__dirname, './public/popup.template.html'),
        }),
        new CopyPlugin({ patterns: staticFiles }),
        new webpack.ProgressPlugin(),
      ],
    },
    presetConfig({ mode, presets }),
    modeConfig(mode),
  )
);
