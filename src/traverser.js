import { JSXAttributeValue, ObjectAssign } from './shared';

export default ({ types, tokens }) => {
  return {
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

    FunctionDeclaration(path, state) {
      if (path.node.id.name === 'render') {
        path.get('body').unshiftContainer(
          'body', 
          ObjectAssign(
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

    ObjectMethod(path, state) {
      if (path.node.key.name === 'render') {
        path.get('body').unshiftContainer(
          'body', 
          ObjectAssign(
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

    JSXAttribute (path, state) {
      if (path.node.name.name === 'class' && path.node.value.type === 'StringLiteral') {
        path.get('value').replaceWith(
          JSXAttributeValue(
            types,
            tokens.declarations[0].id,
            types.identifier(path.node.value.value)
          )
        )
      }
    }
  }
}