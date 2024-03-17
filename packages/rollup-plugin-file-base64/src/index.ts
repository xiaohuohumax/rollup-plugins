import fs from 'fs';
import { resolve, dirname, normalize, isAbsolute } from 'path';
import { Plugin } from 'rollup';
import mime from 'mime-types';

/**
 * Rollup 插件: 将文件以 `base64` 格式导入, 并且添加媒体类型
 * @returns 
 */
export default function fileBase64(): Plugin {
  const fileBase64RE = /\?base64$/i;
  const fileBase64Prefix = '\0/rollup-plugin-file-base64/';

  let cache: Map<string, string>;

  return {
    name: 'rollup-plugin-file-base64',
    buildStart() {
      cache = new Map<string, string>();
    },
    resolveId(id, importer) {
      if (importer === undefined || !fileBase64RE.test(id)) {
        return;
      }
      let file = normalize(id.replace(fileBase64RE, () => ''));

      if (!isAbsolute(file)) {
        file = resolve(dirname(importer), file);
      }

      return fileBase64Prefix + normalize(file);
    },
    load(id) {
      if (!id.startsWith(fileBase64Prefix)) {
        return;
      }
      if (!cache.has(id)) {
        const file = id.slice(fileBase64Prefix.length);
        cache.set(id, `data:${mime.lookup(file)};base64, ${fs.readFileSync(file).toString('base64')}`);
      }
      return `export default ${JSON.stringify(cache.get(id))}`;
    },
  };
}