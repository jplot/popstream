export default {
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  format: 'cjs',
  external: [
    'cluster', 'crypto', 'http', 'os', 'zlib',

    'brotli', 'config', 'fortune', 'fortune-http', 'fortune-nedb',
    'fortune-postgres', 'fortune-postgres', 'fortune-ws',
    'node-lzw', 'underscore'
  ]
}
