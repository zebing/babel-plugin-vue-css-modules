import { importDeclaration } from './shared';
import defaultOptions from './defaultOptions';

interface Options {
  removeImport: boolean,
  types: any,
  path: any
}

export default (
  styleImports: any = [], 
  { 
    removeImport = defaultOptions.removeImport, 
    types,
    path
  }: Options
): any => {
  // import style 为空
  if (!styleImports.length) {
    return {};
  }

  return styleImports.map((node: any) => {
    let importDefaultSpecifier: boolean = 
      node.specifiers.find((n: any) => 
        types.isImportDefaultSpecifier(n)
      );

    if (!importDefaultSpecifier) {
      importDefaultSpecifier = path.scope.generateUidIdentifier('styles');
      const importDefault: any = importDeclaration(types, importDefaultSpecifier, node.source);
      const nodePath: any = path.get(`body.${node.index}`);

      if (removeImport) {
        nodePath.replaceWith(importDefault);
      } else {
        nodePath.insertAfter(importDefault);
      }
    }

    return importDefaultSpecifier;
  })
}