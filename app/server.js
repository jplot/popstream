const logger = require('./logger')
const http = require('./server/http')
const ws = require('./server/ws')
const CONFIG =  require('config')

require('./i18n')

http.start()
if (CONFIG.get('use.ws')) ws.start()

logger.info('started')
