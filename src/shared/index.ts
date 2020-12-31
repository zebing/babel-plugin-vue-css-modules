import path  from 'path';
export * from './utils';

// 判断import是否是样式文件
export const isStyleImport = (filePath: string, cssFile: string[]): boolean => {
  const fileExp: string = cssFile.map(value => `\\.${value}`).join('|');
  return new RegExp(`(${fileExp})$`, 'gi').test(filePath)
}

// 获取文件绝对路径
export const getTargetPath = (url: string, state: any ): string => {
  const dirname: string = path.dirname(state.filename);

  if (url.startsWith('.')) {
    return path.resolve(dirname, url);
  }

  return path.resolve(url);
};
