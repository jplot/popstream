import CONFIG from 'config'
import http from 'http'
import fortuneHTTP from 'fortune-http'
import zlib from 'zlib'
import lzw from 'node-lzw'
import brotli from 'brotli'
import store from '../store'
import debug from '../logger'

const logger = debug('HTTP')

export default {
  start() {
    const recordActions = { 'POST': 'CREATE', 'PATCH': 'UPDATE' }
    const listener = fortuneHTTP(store, {
      serializers: [
        fortuneHTTP.JsonSerializer
      ]
    })

    const server = http.createServer((request, response) => {
      const socket = request.client
      const recordAction = recordActions[request.method] || request.method
      let recordPath = request.url.replace(/\/+$/, '') || '/'

      listener(request, response).then(chuck => {
        const contentEncoding = response.headers['content-encoding'];
        const contentType = (response.headers['content-type'] || '').split(';')[0];

        new Promise((resolve, reject) => {
          if (contentType.includes('application/json') && recordActions.hasOwnProperty(request.method) && recordPath !== '/') {
            recordPath = `/${recordPath.split('/').slice(-1)[0]}`

            if (contentEncoding === 'gzip') {
              zlib.gunzip(chuck.payload, (err, decoded) => {
                resolve(decoded.toString())
              })
            } else if (contentEncoding === 'deflate') {
              zlib.inflate(chuck.payload, (err, decoded) => {
                resolve(decoded.toString())
              })
            } else if (contentEncoding === 'compress') {
              resolve(lzw.decode(chuck.payload))
            } else if (contentEncoding === 'br') {
              resolve(brotli.decompress(chuck.payload))
            } else {
              resolve(chuck.payload.toString())
            }
          } else {
            resolve()
          }
        }).then((payload) => {
          let records = [recordPath]
          if (payload) records = JSON.parse(payload).records.map(record => { return `${recordPath}/${record.id}` })

          for (const record of records) {
            logger.socket(socket, `requested ${recordAction} ${record} => OK`)
          }
        })
      })
      .catch(error => {
        logger.socket(socket, `requested ${recordAction} ${recordPath} => ${error.name}`)

        if (!['NotFoundError', 'BadRequestError'].includes(error.name)) {
          console.error(error.stack)
        }
      })
    })

    store.connect().then(() => {
      server.on('error', (e) => {
        logger.error(`Error: ${e.syscall} ${e.errno} ${e.address}:${e.port}`)
        process.exit()
      })

      server.listen(CONFIG.get('http.port'))
    })

    // store.endTransaction.catch(error => { console.error(error) })

    logger.info(`started on port ${CONFIG.get('http.port')}`)
  }
}
