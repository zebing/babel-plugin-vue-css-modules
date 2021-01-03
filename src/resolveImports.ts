import defaultOptions from './defaultOptions';
import { isStyleImport, isArray } from './shared';

interface Options {
  cssFile: string[],
  exclude: RegExp,
  types: any
}

export default (path: any, options: Options): any => {
  const cssFile: string[] = isArray(options.cssFile)
    ? options.cssFile
    : defaultOptions.cssFile;
  const exclude: RegExp = options.exclude
    ? options.exclude
    : defaultOptions.exclude;

  return path.node.body.filter((node: any, index: number ): boolean => {
    node.index = index;

    return options.types.isImportDeclaration(node) && 
      isStyleImport(node.source.value, cssFile) &&
      !exclude.test(node.source.value);
  });
}