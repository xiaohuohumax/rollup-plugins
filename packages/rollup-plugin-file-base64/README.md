# @xiaohuohumax/rollup-plugin-file-base64

Rollup 插件: 将文件以 `base64` 格式导入, 并且添加媒体类型

```ts
import image from './image.png?base64'

console.log(image);
// data:image/png;base64, ....
```

## Install

```shell
npm i @xiaohuohumax/rollup-plugin-file-base64
```

## Use

```ts
import { defineConfig } from 'rollup'
import fileBase64 from '@xiaohuohumax/rollup-plugin-file-base64';

export default defineConfig({
  input: 'src/index.ts',
  output: [{
    dir: 'dist',
    format: "cjs",
    entryFileNames: '[name].cjs'
  }],
  plugins: [fileBase64()]
})
```

## Typescript

tsconfig.json

```json
{
   "compilerOptions": {
    "types": [
      "@xiaohuohumax/rollup-plugin-file-base64/client"
    ],
  }
}
```