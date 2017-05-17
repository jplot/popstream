import CONFIG from 'config'

export default ((...PREFIX) => ({
  info(...messages) {
    let name = 'Serve'
    if (Number(CONFIG.get('use.cluster')) === 1) name = `Worker:${process.pid}`

    console.log(`[${name}]`, ...PREFIX.map((name) => { return `[${name}]` }), ...messages)
  },

  socket(socket, ...messages) {
    this.info(`[${socket.remoteAddress}:${socket.remotePort}]`, ...messages)
  },

  broadcast(changes) {
    const recordAction = Object.keys(changes)[0]
    const recordType = Object.keys(changes[recordAction])[0]
    const records = changes[recordAction][recordType]

    for (const record of records) {
      const recordId = changes.delete ? record : record.id
      const recordPath = `/${recordType}/${recordId}`

      this.info(`broadcasted ${recordAction.toUpperCase()} ${recordPath}`)
    }
  }
}))
