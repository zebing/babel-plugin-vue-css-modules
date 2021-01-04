import defaultOptions from './defaultOptions';
import { isStyleImport, isArray } from './shared';

export default ({ path, cssFile = defaultOptions.cssFile, exclude = defaultOptions.exclude, types }) => {

  return path.node.body.filter((node, index ) => {
    node.index = index;

    return types.isImportDeclaration(node) && 
      isStyleImport(node.source.value, cssFile) &&
      !exclude.test(node.source.value);
  });
}