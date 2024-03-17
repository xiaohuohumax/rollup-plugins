import { defineConfig } from 'rollup';
import fileBase64 from '@xiaohuohumax/rollup-plugin-file-base64';

export default defineConfig({
  input: 'src/index.ts',
  output: [{
    dir: 'dist',
    format: 'cjs',
    entryFileNames: '[name].cjs'
  }],
  plugins: [fileBase64()]
});