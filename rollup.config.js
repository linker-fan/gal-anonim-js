import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/galAnonim.js',
    format: 'umd',
    name: 'GalAnonim',
    globals: {
      GalAnonim: 'GalAnonim'
    }
  },
  plugins: [typescript(), nodeResolve({ browser: true })]
};
