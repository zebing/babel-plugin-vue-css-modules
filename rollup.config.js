import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import typescript from '@rollup/plugin-typescript';

const external = [];
const plugins = [
  json(),
  resolve({
    extensions: [ '.ts', '.js', '.json' ]
  }),
  commonjs(),
  url(),
  typescript()
];

module.exports = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'named',
  },
  external,
  plugins,
}