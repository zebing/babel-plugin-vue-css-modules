import defaultOptions from './defaultOptions';
import { isStyleImport, isArray } from './shared';
import traverse from './traverse';
// import getCssModules from './getCssModules';

export default ({ types }) => {

  return {
    name: 'babel-plugin-vue-css-modules',
    visitor: {
      Program: {
        enter (path: any, state: any): void {
          const cssFile: string[] = isArray(state.opts.cssFile) 
            ? state.opts.cssFile 
            : defaultOptions.cssFile;

          const styleImports = path.node.body.filter(node =>
            types.isImportDeclaration(node) && isStyleImport(node.source.value, cssFile)
          );
          
          // 该文件无需处理
          if (!/\.vue$/.test(state.filename) && !styleImports.length) {
            return;
          }

          // const tokens = getCssModules(styleImports, state);

          path.traverse(traverse, state);
        }
      }
    }
  }
}