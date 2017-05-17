import CONFIG from 'config'
import fortuneWS from 'fortune-ws'
import store from '../store'
import debug from '../logger'

const logger = debug('WS')

export default {
  start() {
    let clients = null

    const optionsWS = {
      port: CONFIG.get('ws.port')
    }
    const server = fortuneWS(store, (state, changes) => {
      logger.broadcast(changes)

      if (changes) return changes
      return state
    }, optionsWS)

    server.on('connection', (socket) => {
      logger.socket(socket._socket, 'connected')
    })

    logger.info(`started on port ${CONFIG.get('ws.port')}`)
  }
}
