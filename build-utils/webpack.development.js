const path = require('path');

module.exports = () => ({
  output: {
    path: path.join(__dirname, '../dev-dist'),
    filename: '[name].js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dev-dist'),
    compress: true,
    historyApiFallback: true,
    writeToDisk: true,
  },
});
