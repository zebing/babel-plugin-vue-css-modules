import { isStyleImport, isArray } from './shared';
import traverse from './traverse';
import getCssModules from './getCssModules';
import resolveImports from './resolveImports';

export default ({ types }) => {

  return {
    name: 'babel-plugin-vue-css-modules',
    visitor: {
      Program: {
        enter (path: any, state: any): void {
          const styleImports: any[] = resolveImports(path, {
            cssFile: state.opts.cssFile,
            exclude: state.opts.exclude,
            types: types
          });
          
          // 该文件无需处理
          if (!/\.vue$/.test(state.filename) && !styleImports.length) {
            return;
          }

          const styleImportsTokens: object = getCssModules(styleImports, {
            removeImport: state.opts.removeImport, 
            types,
            path
          });

          path.traverse(traverse, state);
        }
      }
    }
  }
}