import { objectAssignNode } from './buildNode';
import defaultOptions from './defaultOptions';
import { solveJSXAttribute, solveObjectAttribute } from './resolveAttribute';

export default ({ types, tokens, styleName = defaultOptions.styleName }) => {
  const stylesId = tokens.declarations[0].id;
  return {
    // 将静态节点提升还原
    VariableDeclaration(path, state) {
      if (!/\.vue$/.test(state.filename) || !/^_hoisted_[1-9]+$/gi.test(path.node.declarations[0].id.name)) {
        return;
      }

      const binding = path.scope.getBinding(path.node.declarations[0].id.name)
      binding.referencePaths.map((nodePath) => {
        nodePath.replaceWith(path.node.declarations[0].init)
      });
      binding.path.remove();
    },

    // 遍历template 模板编译成render函数节点
    FunctionDeclaration(path, state) {
      if (path.node.id.name === 'render') {
        path.get('body').unshiftContainer(
          'body', 
          objectAssignNode(
            types,
            [
              stylesId,
              types.memberExpression(
                path.node.params[0],
                types.identifier('$style'),
              ),
            ]
          )
        );
      }
    },

    // 遍历template编译的节点属性
    ObjectProperty (path, state) {
      if (path.node.key.name === styleName && path.node.value.type === 'StringLiteral') {
        solveObjectAttribute({
          path, 
          types, 
          stylesId, 
          styleName
        })
      }
    },

    // 遍历jsx render函数节点
    ObjectMethod(path, state) {
      if (path.node.key.name === 'render') {
        path.get('body').unshiftContainer(
          'body', 
          objectAssignNode(
            types, 
            [
              stylesId,
              types.memberExpression(
                types.thisExpression(),
                types.identifier('$style'),
              ),
            ]
          )
        );
      }
    },

    // 遍历jsx 节点属性
    JSXAttribute (path, state) {
      if (path.node.name.name === styleName && path.node.value.type === 'StringLiteral') {
        solveJSXAttribute({
          path, 
          types, 
          stylesId, 
          styleName
        });
      }
    }
  }
}