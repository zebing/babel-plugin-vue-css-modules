import traverser from './traverser';
import getCssModules from './getCssModules';
import resolveImports from './resolveImports';

export default ({ types }) => {

  return {
    name: 'babel-plugin-vue-css-modules',
    visitor: {
      Program: {
        enter (path, state) {
          const styleImports = resolveImports({
            path,
            types,
            cssFile: state.opts.cssFile,
            exclude: state.opts.exclude
          });
          
          // 该文件无需处理
          if (!/\.vue$/.test(state.filename) && !styleImports.length) {
            return;
          }

          const tokens = getCssModules({
            imports: styleImports,
            removeImport: state.opts.removeImport, 
            types,
            path
          });

          path.traverse(traverser({
            types,
            tokens
          }), state);
        }
      }
    }
  }
}