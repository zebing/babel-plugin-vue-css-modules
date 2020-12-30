const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const context = path.resolve(process.cwd());

module.exports = {
  // mode: 'development',
  entry: {
    main: context + '/src/index.js'
  },
  output: {
    path:  context + '/dist',
    filename: '[name].[fullhash:8].js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': context + '/components'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  optimization: {
    minimize: false
  }
}