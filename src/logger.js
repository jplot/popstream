import CONFIG from 'config'
import cluster from 'cluster'

export default ((...PREFIX) => ({
  _formatPrefix(p = null) {
    p = p || process
    let name = 'Serve'
    if (Number(CONFIG.get('use.cluster')) === 1) name = `${p === null && cluster.isMaster ? 'Master' : 'Worker'}:${p.pid}`

    let prefixFormated = PREFIX.map((name) => { return `[${name}]` })
    if (prefixFormated.length !== 0) {
      prefixFormated[0] = `\x1b[33m${prefixFormated[0]}`
      prefixFormated[prefixFormated.length - 1] = `${prefixFormated[prefixFormated.length - 1]}\x1b[0m`
    }

    return [`\x1b[35m[${name}]\x1b[0m`, ...prefixFormated]
  },

  worker(p, ...messages) {
    console.log(...this._formatPrefix(p), ...messages)
  },

  info(...messages) {
    console.log(...this._formatPrefix(), ...messages)
  },

  error(...messages) {
    if (messages.length !== 0) {
      messages[0] = `\x1b[31m${messages[0]}`
      messages[messages.length - 1] = `${messages[messages.length - 1]}\x1b[0m`
    }

    console.error(...this._formatPrefix(), ...messages)
  },

  socket(socket, ...messages) {
    this.info(`[${socket.remoteAddress}:${socket.remotePort}]`, ...messages)
  }
}))
