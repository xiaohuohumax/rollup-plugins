import { builtinModules } from 'node:module';
import fs from 'node:fs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

/**
 * 创建 rollup 配置
 * @param {string} pkg package.json 路径
 * @param {string[]} externals 排除依赖
 * @returns {import('rollup').RollupOptions[]}
 */
export function createConfig(pkg = 'package.json', externals = []) {
  const pkgJson = JSON.parse(fs.readFileSync(pkg, 'utf-8'));

  const external = Object.keys(pkgJson.dependencies || {})
    .concat(Object.keys(pkgJson.peerDependencies || {}))
    .concat(builtinModules)
    .concat(externals);

  return [
    {
      input: 'src/index.ts',
      external,
      onwarn: (warning) => {
        throw Object.assign(new Error(), warning);
      },
      strictDeprecations: true,
      output: [
        {
          format: 'cjs',
          file: pkgJson.main,
          sourcemap: true,
        },
        {
          format: 'es',
          file: pkgJson.module,
          sourcemap: true
        }
      ],
      plugins: [typescript({ sourceMap: true })]
    },
    {
      input: 'src/index.ts',
      external,
      onwarn: (warning) => {
        throw Object.assign(new Error(), warning);
      },
      strictDeprecations: true,
      output: [
        {
          format: 'es',
          file: pkgJson.types,
          sourcemap: true,
        }
      ],
      plugins: [dts()]
    }
  ];
}