import CONFIG from 'config'
import fortuneWS from 'fortune-ws'
import msgpack from 'msgpack-lite'
import store from '../store'
import redis from './redis'
import debug from '../logger'

const logger = debug('WS')

export default {
  start() {
    let sockets = []

    const optionsWS = {
      port: CONFIG.get('ws.port')
    }
    const server = fortuneWS(store, (state, changes) => this.change(state, changes), optionsWS)

    if (Number(CONFIG.get('use.cluster')) === 1) {
      const client = redis.start('popstream:workers:ws')

      // Inspired from https://github.com/fortunejs/fortune-ws/blob/482ac4398aa9ded945a202b4c2dd0b1897d12874/lib/index.js#L184
      client.pull((changes) => {
        if (sockets.length) {
          sockets.forEach((socket) => {
            const state = server.stateMap.get(socket)

            socket.send(msgpack.encode({ changes: this.change(state, changes) }), { binary: true })
          })
        }
      })

      store.on(store.common.events.change, (changes) => {
        return Promise.resolve(changes)
        .then((changes) => {
          if (!changes) return
          client.push(changes)
        })
      })
    }

    server.on('connection', (socket) => {
      logger.socket(socket._socket, 'connected')
      sockets.push(socket)
    })

    server.on('error', (e) => {
      logger.error(`Error: ${e.syscall} ${e.errno} ${e.address}:${e.port}`)
      process.exit()
    })

    logger.info(`started on port ${CONFIG.get('ws.port')}`)
  },

  change(state, changes) {
    const { action, records } = this._recordsFormat(changes)

    records.forEach((record) => {
      logger.info(`broadcasted ${action} ${record}`)
    })

    if (changes) return changes
    return state
  },

  _recordsFormat(changes) {
    const recordAction = Object.keys(changes)[0]
    const recordType = Object.keys(changes[recordAction])[0]
    const records = changes[recordAction][recordType].map((record) => {
      const recordId = changes.delete ? record : record.id
      const recordPath = `/${recordType}/${recordId}`

      return recordPath
    })

    return {
      action: recordAction.toUpperCase(),
      records: records
    }
  }
}
