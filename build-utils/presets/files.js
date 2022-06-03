module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|png|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
    ],
  },
});
