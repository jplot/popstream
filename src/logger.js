import CONFIG from 'config'

export default ((...PREFIX) => ({
  _formatPrefix() {
    let name = 'Serve'
    if (Number(CONFIG.get('use.cluster')) === 1) name = `Worker:${process.pid}`

    let prefixFormated = PREFIX.map((name) => { return `[${name}]` })
    if (prefixFormated.length !== 0) {
      prefixFormated[0] = `\x1b[33m${prefixFormated[0]}`
      prefixFormated[prefixFormated.length - 1] = `${prefixFormated[prefixFormated.length - 1]}\x1b[0m`
    }

    return [`\x1b[35m[${name}]\x1b[0m`, ...prefixFormated]
  },

  info(...messages) {
    console.log(...this._formatPrefix(), ...messages)
  },

  socket(socket, ...messages) {
    this.info(`[${socket.remoteAddress}:${socket.remotePort}]`, ...messages)
  }
}))
