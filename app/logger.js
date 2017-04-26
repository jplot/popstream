const CONFIG =  require('config')

const logger = {
  info(...message) {
    let name = 'Serve'
    if (CONFIG.get('use.cluster')) name = `Worker:${process.pid}`

    console.log(`[${name}]`, ...message)
  }
}

module.exports = logger
