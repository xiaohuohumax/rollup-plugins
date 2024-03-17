import { defineConfig } from 'rollup';
import raw from '@xiaohuohumax/rollup-plugin-raw';

export default defineConfig({
  input: 'src/index.ts',
  output: [{
    dir: 'dist',
    format: 'cjs',
    entryFileNames: '[name].cjs'
  }],
  plugins: [raw()]
});