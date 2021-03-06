const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const babelPluginVueCssModules = require('../../../dist').default;

const response = require('./response');
const context = path.resolve(__dirname, '../');

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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [],
            plugins: [
              "@vue/babel-plugin-jsx",
              [babelPluginVueCssModules, {
                cssFile: ['css', 'scss', 'less'],
                styleName: 'classname',
                exclude: (path) => {
                  if (/^[^\.]/gi.test(path)) {
                    return true;
                  }

                  if (/reset\.css$/gi.test(path)) {
                    return true;
                  }
    
                  return false;
                },
                removeImport: true
              }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: "[local]-[hash:base64:8]",
                mode: (resourcePath) => {
                  if (/[\/\\]node_modules[\/\\]/gi.test(resourcePath)) {
                    return "global";
                  }

                  if (/reset\.css$/gi.test(resourcePath)) {
                    return "global";
                  }
    
                  return "local";
                },
              },
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