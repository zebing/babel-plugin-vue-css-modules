import { JSXAttributeValue } from './shared';

export default ({ types, tokens }) => {
  return {
    ObjectMethod(path, state) {
      if (path.node.key.name === 'render') {
        const node = types.expressionStatement(
          types.callExpression(
            types.memberExpression(
              types.identifier('Object'),
              types.identifier('assign'),
            ),
            [
              tokens.declarations[0].id,
              types.memberExpression(
                types.thisExpression(),
                types.identifier('$style'),
              ),
            ]
          )
        )
        path.get('body').unshiftContainer('body', node);
      }
    },

    JSXAttribute (path, state) {
      if (tokens.declarations[0].init.arguments.length < 1) {
        return;
      }
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