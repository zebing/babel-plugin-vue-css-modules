import { JSXAttributeValue, ObjectAssign } from './shared';

export default ({ types, tokens }) => {
  return {
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