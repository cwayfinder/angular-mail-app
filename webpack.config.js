'use strict';

var NODE_ENV = process.env.NODE_ENV || 'development';
var webpack = require('webpack');

module.exports = {
  context: __dirname + '/app',
  entry: {
    app: './index'
    // shared: './shared'
    // about: './about',
    // common: ['./common', './welcome']
  },
  output: {
    path: __dirname + '/public',
    filename: "[name].js",
    library: '[name]'
  },

  devtool: NODE_ENV === 'development' ? 'source-map' : null,

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?presets[]=es2015'
    }]
  }
};
