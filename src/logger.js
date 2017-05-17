import CONFIG from 'config'

export default ((...PREFIX) => ({
  info(...messages) {
    let name = 'Serve'
    if (Number(CONFIG.get('use.cluster')) === 1) name = `Worker:${process.pid}`

    console.log(`[${name}]`, ...PREFIX.map((name) => { return `[${name}]` }), ...messages)
  },

  socket(socket, ...messages) {
    this.info(`[${socket.remoteAddress}:${socket.remotePort}]`, ...messages)
  }
}))
