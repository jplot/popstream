import CONFIG from 'config'
import http from './server/http'
import ws from './server/ws'
import debug from './logger'

const logger = debug()

import './i18n'

export default {
  start() {
    http.start()
    if (Number(CONFIG.get('use.ws')) === 1) ws.start()
    logger.info('started')
  }
}
