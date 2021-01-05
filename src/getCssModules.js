import defaultOptions from './defaultOptions';
import { importDeclarationNode, stylesNode } from './buildNode';

export default ({ 
  imports = [],
  removeImport = defaultOptions.removeImport, 
  types,
  path
}) => {
  const styleIdentifier = path.scope.generateUidIdentifier('styles');
  
  // import style为空, 返回空节点
  if (!imports.length) {
    const emptyNode = stylesNode(types, styleIdentifier, []);
    path.unshiftContainer('body', emptyNode);
    return emptyNode;
  }

  let lastImportIndex = imports[imports.length - 1].index;

  // 将import 转化成 import styles from 'url'形式
  const normalizeStylesNode =  imports.map((node) => {
    if (node.specifiers[0] && types.isImportDefaultSpecifier(node.specifiers[0])) {
      return node;
    }

    const styleScopeUid = path.scope.generateUidIdentifier('styles');
    const styleImportNode = importDeclarationNode(types, styleScopeUid, node.source);
    const lastImportNode = path.get(`body.${node.index}`);

    if (removeImport) {
      lastImportNode.replaceWith(styleImportNode);
    } else {
      lastImportNode.insertAfter(styleImportNode);
      lastImportIndex++;
    }

    return styleImportNode;
  });

  const node = stylesNode(types, styleIdentifier, normalizeStylesNode);
  path.get(`body.${lastImportIndex}`).insertAfter(node);

  return node;
}