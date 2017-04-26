const http = require('http')
const fortuneHTTP = require('fortune-http')
const zlib = require('zlib')
const store = require('./store')
const logger = require('./logger')
const CONSTANTS = require('./constants')

require('./i18n')

const listener = fortuneHTTP(store)
const recordActions = { 'POST': 'CREATE', 'PATCH': 'UPDATE' }

const server = http.createServer((request, response) => {
  listener(request, response).then(chuck => {
    const encoding = response.headers['content-encoding'];
    const recordAction = recordActions[request.method] || request.method
    let recordPath = request.url.replace(/\/+$/, '')

    const logger_records = (records) => {
      for (const record of records) {
        logger.info('[HTTP]', `[${request.client.remoteAddress}]`, `requested ${recordAction} ${record}`)
      }
    }

    if (recordActions.hasOwnProperty(request.method)) {
      recordPath = `/${recordPath.split('/').slice(-1)[0]}`

      if (encoding == 'gzip') {
        zlib.gunzip(chuck.payload, (err, decoded) => {
          logger_records(JSON.parse(decoded.toString()).records.map(record => { return `${recordPath}/${record.id}` }))
        })
      } else if (encoding == 'deflate') {
        zlib.inflate(chuck.payload, function(err, decoded) {
          logger_records(JSON.parse(decoded.toString()).records.map(record => { return `${recordPath}/${record.id}` }))
        })
      } else {
        logger_records(JSON.parse(chuck.payload.toString()).records.map(record => { return `${recordPath}/${record.id}` }))
      }
    } else {
      logger_records([recordPath])
    }
  })
  .catch(error => {
    console.error(error.stack)
  })
})

store.connect().then(() => server.listen(CONSTANTS.http.port))
// store.endTransaction.catch(error => { console.error(error) })

logger.info('started')
