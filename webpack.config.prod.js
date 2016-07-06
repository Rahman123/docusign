var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index'
  ],
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true
    // })
  ],
  output: {
    path: path.join(__dirname, 'salesforce-build'),
    filename: 'js/bundle.min.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.less']
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel',
      exclude: /(node_modules)/,
      include: path.join(__dirname, 'src'),
      query: {
        presets: ["stage-0", "react", "es2015"],
        plugins: [
          "transform-decorators-legacy",
          "transform-class-properties"
        ]
      }
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /(node_modules)/,
      include: path.join(__dirname, 'src'),
      query: {
        presets: ["stage-0", "react", "es2015"],
        plugins: [
          "transform-decorators-legacy",
          "transform-class-properties"
        ]
      }
    }, {
      test: /\.less$/,
      loader: "style!css!less"
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }]
  }
};
