const logger = require('./logger')
const http = require('./server/http')
const ws = require('./server/ws')
const CONSTANTS = require('./constants')

require('./i18n')

http.start()
if (CONSTANTS.use.ws) ws.start()

logger.info('started')
