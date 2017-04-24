const CONSTANTS = require('./constants')

const logger = {
  info(...message) {
    let name = 'Serve'
    if (CONSTANTS.use.cluster) name = `Worker:${process.pid}`

    console.log(`[${name}]`, ...message)
  }
}

module.exports = logger
