import fs from 'fs';
import { resolve, dirname, normalize, isAbsolute } from 'path';
import { Plugin } from 'rollup';

/**
 * Rollup 插件: 将文件以字符串导入
 * @returns 
 */
export default function raw(): Plugin {
  const rawRE = /\?raw$/i;
  const rawPrefix = '\0/rollup-plugin-raw/';
  return {
    name: 'rollup-plugin-raw',
    resolveId(id, importer) {
      if (importer === undefined || !rawRE.test(id)) {
        return;
      }
      let file = normalize(id.replace(rawRE, () => ''));

      if (!isAbsolute(file)) {
        file = resolve(dirname(importer), file);
      }

      return rawPrefix + normalize(file);
    },
    load(id) {
      if (!id.startsWith(rawPrefix)) {
        return;
      }
      const file = id.slice(rawPrefix.length);
      return `export default ${JSON.stringify(fs.readFileSync(file, 'utf-8'))}`;
    },
  };
}