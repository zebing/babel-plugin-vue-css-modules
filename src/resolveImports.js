import defaultOptions from './defaultOptions';

export default ({ path, cssFile = defaultOptions.cssFile, exclude = defaultOptions.exclude, types }) => {

  return path.node.body.filter((node, index ) => {
    node.index = index;

    // 非import节点
    if (!types.isImportDeclaration(node)) {
      return false;
    }

    // import节点，非[cssFile]文件类型
    const fileExp = cssFile.map(value => `\\.${value}`).join('|');
    if (!new RegExp(`(${fileExp})$`, 'gi').test(node.source.value)) {
      return false;
    }

    // exclude 类型 1 regexp， 2 function
    const excludeFn = typeof exclude === 'function'
      ? exclude
      : (path) => exclude.test(path)
    if (excludeFn(node.source.value)) {
      return false;
    }

    return true;
  });
}