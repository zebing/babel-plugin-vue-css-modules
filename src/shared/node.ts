// 构建import节点
export function importDeclaration<T>(types: any, defaultSpecifier: T, source: T): T {
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
export function getStyles<T>(types: any, stylesIdentifier: any, styleImports: any): T {
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
          styleImports.map(node => node.specifiers[0].local)
        )
      )
    ]
  )
} 
