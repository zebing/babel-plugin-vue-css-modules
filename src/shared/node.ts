// 构建import节点
export function importDeclaration<T>(types: any, defaultSpecifier: T, source: T): T {
  return types.importDeclaration(
    [
      types.importDefaultSpecifier(
        types.Identifier(defaultSpecifier)
      )
    ],
    types.stringLiteral(source)
  );
}
