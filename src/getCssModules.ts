import postcss from 'postcss';
import postcssModules from 'postcss-modules';
import fs from 'fs';
import { getTargetPath } from './shared';

export default async (styleImports: any = [], state: any) => {
  // import style 为空
  if (!styleImports.length) {
    return {};
  }
  const runner = postcss([postcssModules]);
  styleImports.map((node) => 
    new Promise((resolve, reject) => {
      const targetPath = getTargetPath(node.source.value, state);
      runner.process(fs.readFileSync(targetPath, 'utf-8'))
      .then(result => {
        console.log(result)
      })
    })
  ) 

  const tokens = await runner.process(fs.readFileSync('src/app.css'))
    .then(result => {
      console.log(result)
    })
}