# @xiaohuohumax/rollup-plugin-raw

Rollup 插件: 将文件以字符串导入

```ts
import info from './info.txt?raw';

console.log(info);
```

## Install

```shell
npm i @xiaohuohumax/rollup-plugin-raw
```

## Use

```ts
import { defineConfig } from 'rollup'
import raw from '@xiaohuohumax/rollup-plugin-raw';

export default defineConfig({
  input: 'src/index.ts',
  output: [{
    dir: 'dist',
    format: "cjs",
    entryFileNames: '[name].cjs'
  }],
  plugins: [raw()]
})
```

## Typescript

tsconfig.json

```json
{
   "compilerOptions": {
    "types": [
      "@xiaohuohumax/rollup-plugin-raw/client"
    ],
  }
}
```