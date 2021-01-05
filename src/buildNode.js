// 构建import节点
export function importDeclarationNode(types, defaultSpecifier, source) {
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
export function stylesNode(types, stylesIdentifier, styleImports) {
  return types.variableDeclaration(
    'const', 
    [
      types.variableDeclarator(
        stylesIdentifier,
        objectAssignNode(types, [
          types.ObjectExpression([]),
          ...styleImports.map(node => node.specifiers[0].local)
        ])
      )
    ]
  )
} 

// 构建Object.assign
export function objectAssignNode(types, argument) {
  return types.callExpression(
    types.memberExpression(
      types.identifier('Object'),
      types.identifier('assign'),
    ),
    argument
  )
}

// 构建jsx节点
export function jSXAttributeNode(types, jsxAttributeName, stylesObjectName, propertyName) {
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
export function jSXAttributeValueNode(types, stylesObjectName, propertyName) {
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
