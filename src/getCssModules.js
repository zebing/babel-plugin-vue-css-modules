import { importDeclaration, getStyles } from './shared';
import defaultOptions from './defaultOptions';

export default ({ 
  imports,
  removeImport = defaultOptions.removeImport, 
  types,
  path
}) => {
  const styleIdentifier = path.scope.generateUidIdentifier('styles');
  
  if (!imports.length) {
    const emptyNode = getStyles(types, styleIdentifier, []);
    path.unshiftContainer('body', emptyNode);
    return emptyNode;
  }

  let lastImportIndex = imports[imports.length - 1].index;

  // 将import 转化成 import styles from 'url'形式
  const normalizeStyles =  imports.map((node) => {
    if (node.specifiers.length) {
      return node;
    }

    const importIdentifier = path.scope.generateUidIdentifier('styles');
    const importDefault = importDeclaration(types, importIdentifier, node.source);
    const nodePath = path.get(`body.${node.index}`);

    if (removeImport) {
      nodePath.replaceWith(importDefault);
    } else {
      nodePath.insertAfter(importDefault);
      lastImportIndex++;
    }

    return importDefault;
  });

  const stylesNode = getStyles(types, styleIdentifier, normalizeStyles);
  path.get(`body.${lastImportIndex}`).insertAfter(stylesNode);

  return stylesNode;
}