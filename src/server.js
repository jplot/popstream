import CONFIG from 'config'
import http from './server/http'
import ws from './server/ws'
import logger from './logger'

import './i18n'

export default {
  start() {
    http.start()
    if (parseInt(CONFIG.get('use.ws')) === 1) ws.start()
    logger.info('started')
  }
}
