const environment = process.env.NODE_ENV || 'development'

const env = {
  isDevelopment: environment === 'development',
  isProduction: environment === 'production'
}

module.exports = env
