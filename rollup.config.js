export default {
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  format: 'cjs',
  external: [
    'cluster', 'crypto', 'http', 'os', 'zlib',

    'config', 'fortune', 'fortune-http', 'fortune-nedb',
    'fortune-postgres', 'fortune-postgres', 'fortune-ws',
    'underscore'
  ]
}
