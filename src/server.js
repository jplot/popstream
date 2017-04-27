import CONFIG from 'config'
import http from './server/http'
import ws from './server/ws'
import logger from './logger'

import './i18n'

export default {
  start() {
    http.start()
    if (CONFIG.get('use.ws')) ws.start()

    logger.info('started')
  }
}
