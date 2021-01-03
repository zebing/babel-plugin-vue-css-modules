import { importDeclaration, getStyles } from './shared';
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

  let lastImportIndex = styleImports[styleImports.length - 1].index;

  const normalizeStyles: any =  styleImports.map((node: any) => {
    let importDefaultSpecifier: any = 
      node.specifiers.find((n: any) => 
        types.isImportDefaultSpecifier(n)
      );
    
    if (importDefaultSpecifier) {
      return node;
    }

    const importIdentifier: any = path.scope.generateUidIdentifier('styles');
    const importDefault: any = importDeclaration(types, importIdentifier, node.source);
    const nodePath: any = path.get(`body.${node.index}`);

    if (removeImport) {
      nodePath.replaceWith(importDefault);
    } else {
      nodePath.insertAfter(importDefault);
      lastImportIndex++;
    }

    return importDefault;
  });
  const styleIdentifier = path.scope.generateUidIdentifier('styles');
  const stylesNode: any = getStyles(types, styleIdentifier, normalizeStyles);
  path.get(`body.${lastImportIndex}`).insertAfter(stylesNode);
  return stylesNode;
}