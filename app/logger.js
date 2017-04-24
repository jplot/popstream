const env = require('./env')

const logger = {
  info(...message) {
    let name = 'Serve'
    if (env.isProduction) name = `Worker:${process.pid}`

    console.log(`[${name}]`, ...message)
  }
}

module.exports = logger
