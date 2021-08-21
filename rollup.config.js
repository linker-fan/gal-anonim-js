import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/galAnonim.js',
    format: 'umd',
    name: 'GalAnonim',
    globals: {
      'node-fetch': 'fetch'
    }
  },
  plugins: [typescript()]
};
