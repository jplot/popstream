const environment = process.env.NODE_ENV || 'development'

export default {
  isDevelopment: environment === 'development',
  isProduction: environment === 'production'
}
