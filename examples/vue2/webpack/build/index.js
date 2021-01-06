const webpack = require('webpack');
const config = require('./config');

const compiler = webpack(config);
compiler.run((err, stat) => {
  console.log(err)
})