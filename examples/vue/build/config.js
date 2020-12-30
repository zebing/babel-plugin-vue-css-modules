const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const response = require('./response');
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
    new HtmlWebpackPlugin({
      templateContent: `
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
            <style>body {padding: 0;margin: 0;}</style>
            <script>(${response.toString()})()</script>
          </head>
          <body>
            
          </body>
        </html>
      `
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  optimization: {
    minimize: false
  }
}