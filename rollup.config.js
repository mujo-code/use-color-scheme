export default {
  entry: 'src/index.js',
  external: ['react'],
  output: [
    {
      globals: { react: 'React', window: 'window' },
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'UseColorScheme',
    },
  ],
}
