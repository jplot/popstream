const http = require('http')
const fortuneHTTP = require('fortune-http')
const store = require('./store')
const logger = require('./logger')

require('./i18n')

const listener = fortuneHTTP(store)
const server = http.createServer((request, response) => {
  logger.info('[HTTP]', `requested ${request.method} ${request.url} for ${request.client.remoteAddress}`)
  listener(request, response).catch(error => { console.error(error.stack) })
})

store.connect().then(() => server.listen(1337))
// store.endTransaction.catch(error => { console.error(error) })

logger.info('started')
