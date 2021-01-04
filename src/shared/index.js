import path  from 'path';
export * from './utils';
export * from './node';

// 判断import是否是样式文件
export const isStyleImport = (filePath, cssFile) => {
  const fileExp = cssFile.map(value => `\\.${value}`).join('|');
  return new RegExp(`(${fileExp})$`, 'gi').test(filePath)
}

// 获取文件绝对路径
export const getTargetPath = (url, state) => {
  const dirname = path.dirname(state.filename);

  if (url.startsWith('.')) {
    return path.resolve(dirname, url);
  }

  return path.resolve(url);
};
