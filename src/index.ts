import * as BabelTypes from '@babel/types';

export default function ({ types: BabelTypes }): any {

  return {
    name: 'babel-plugin-vue-css-modules',
    visitor: {
      Program: {
        enter (path1, state) {
          console.log(path1)
        }
      },

      FunctionDeclaration (path)  {
        console.log(path)
      }
    }
  }
}