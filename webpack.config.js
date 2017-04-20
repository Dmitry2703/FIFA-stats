const path = require('path');

const config = {
  entry: [
    './src/js/index.js',
    './src/css/index.css',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: 'temp/' // for webpack-dev-server output
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  },
  devtool: "eval",
  devServer: {
    contentBase: path.join(__dirname, "dev"),
    compress: true,
    port: 9000,
  }
};

module.exports = config;
