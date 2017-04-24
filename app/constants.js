const env = require('./env')

const constants = {
  use: {
    postgres: (parseInt(process.env.POPSTREAM_POSTGRES) || (env.isProduction ? 1 : 0)) === 1
  },
  postgres: {
    host:     process.env.POPSTREAM_POSTGRES_HOST || '127.0.0.1',
    port:     parseInt(process.env.POPSTREAM_POSTGRES_PORT) || 5432,
    username: process.env.POPSTREAM_POSTGRES_USERNAME || 'popstream',
    password: process.env.POPSTREAM_POSTGRES_PASSWORD || 'mysecretpassword',
    database: process.env.POPSTREAM_POSTGRES_DATABASE || 'popstream'
  },
  http: {
    port:     parseInt(process.env.POPSTREAM_HTTP_PORT) || 1337
  }
}

module.exports = constants
