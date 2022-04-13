const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname), //path.resolve(__dirname, 'public'),
    publicPath: '/' //'/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /__test__/
        ],
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};