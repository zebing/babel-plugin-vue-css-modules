// 构建import节点
export function importDeclaration(types, defaultSpecifier, source) {
  return types.importDeclaration(
    [
      types.importDefaultSpecifier(
        defaultSpecifier
      )
    ],
    source
  );
}

// 构建styles
export function getStyles(types, stylesIdentifier, styleImports) {
  return types.variableDeclaration(
    'const', 
    [
      types.variableDeclarator(
        stylesIdentifier,
        types.callExpression(
          types.memberExpression(
            types.identifier('Object'),
            types.identifier('assign'),
          ),
          [
            types.ObjectExpression([]),
            ...styleImports.map(node => node.specifiers[0].local)
          ]
        )
      )
    ]
  )
} 

// 构建jsx节点
export function JSXAttribute(types, jsxAttributeName, stylesObjectName, propertyName) {
  return types.jsxAttribute(
    jsxAttributeName,
    types.jsxExpressionContainer(
      types.memberExpression(
        stylesObjectName,
        propertyName,
      )
    )
  )
}

// 构建jsx节点值
export function JSXAttributeValue(types, stylesObjectName, propertyName) {
  return types.jsxExpressionContainer(
    types.logicalExpression(
      '||',
      types.memberExpression(
        stylesObjectName,
        propertyName,
      ),
      types.stringLiteral(propertyName.name)
    )
  )
}
