import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

const external = [];
const plugins = [
  json(),
  resolve({
    extensions: [ '.js', '.json' ]
  }),
  commonjs(),
  url(),
  getBabelOutputPlugin({ presets: ['@babel/preset-env'] })
];

module.exports = {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'named',
  },
  external,
  plugins,
}