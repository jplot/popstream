import CONFIG from 'config'
import http from 'http'
import fortuneHTTP from 'fortune-http'
import zlib from 'zlib'
import logger from '../logger'
import store from '../store'

export default {
  start() {
    const listener = fortuneHTTP(store)
    const recordActions = { 'POST': 'CREATE', 'PATCH': 'UPDATE' }

    const server = http.createServer((request, response) => {
      listener(request, response).then(chuck => {
        const contentEncoding = response.headers['content-encoding'];
        const contentType = response.headers['content-type'].split(';')[0];

        const recordAction = recordActions[request.method] || request.method
        let recordPath = request.url.replace(/\/+$/, '')

        const logger_records = (records) => {
          for (const record of records) {
            logger.info('[HTTP]', `[${request.client.remoteAddress}]`, `requested ${recordAction} ${record}`)
          }
        }

        if (contentType.includes('application/json') && recordActions.hasOwnProperty(request.method)) {
          recordPath = `/${recordPath.split('/').slice(-1)[0]}`

          if (contentEncoding === 'gzip') {
            zlib.gunzip(chuck.payload, (err, decoded) => {
              logger_records(JSON.parse(decoded.toString()).records.map(record => { return `${recordPath}/${record.id}` }))
            })
          } else if (contentEncoding === 'deflate') {
            zlib.inflate(chuck.payload, (err, decoded) => {
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

    store.connect().then(() => server.listen(CONFIG.get('http.port')))
    // store.endTransaction.catch(error => { console.error(error) })

    logger.info('[HTTP]', `started on port ${CONFIG.get('http.port')}`)
  }
}
