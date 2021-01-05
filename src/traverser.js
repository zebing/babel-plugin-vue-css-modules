import { jSXAttributeValueNode, objectAssignNode } from './buildNode';

export default ({ types, tokens }) => {
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
              tokens.declarations[0].id,
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
      if (path.node.key.name === 'class' && path.node.value.type === 'StringLiteral') {
        path.get('value').replaceWith(
          types.logicalExpression(
            '||',
            types.memberExpression(
              tokens.declarations[0].id,
              types.identifier(path.node.value.value)
            ),
            types.stringLiteral(path.node.value.value)
          )
        )
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
              tokens.declarations[0].id,
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
      if (path.node.name.name === 'class' && path.node.value.type === 'StringLiteral') {
        path.get('value').replaceWith(
          jSXAttributeValueNode(
            types,
            tokens.declarations[0].id,
            types.identifier(path.node.value.value)
          )
        )
      }
    }
  }
}