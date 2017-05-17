import CONFIG from 'config'
import redis from 'redis'
import os from 'os'
import msgpack from 'msgpack-lite'
import ws from '../ws'
import debug from '../../logger'

const logger = debug('Redis', 'Puller')

export default {
  start(CHANNEL) {
    const redisHost = {
      host: CONFIG.get('redis.host'),
      port: CONFIG.get('redis.port'),
      return_buffers: true
    }
    const client = redis.createClient(redisHost);

    client.on('subscribe', (channel, count) => {
      logger.info(`subscribed ${channel} channel`)
    })

    client.on('unsubscribe', (channel, count) => {
      logger.info(`unsubscribed ${channel} channel`)
    })

    client.on('ready', () => {
      client.subscribe(CHANNEL);
      logger.info('ready')
    })

    return ((callback) => {
      client.on('message', (channel, data) => {
        const { worker, changes } = msgpack.decode(Buffer.from(data))

        if (worker.hostname === os.hostname() && worker.pid === process.pid) return

        const { action, records } = ws._recordsFormat(changes)

        records.forEach((record) => {
          logger.info(`received ${action} ${record}`)
        })

        callback(changes)
      })
    })
  }
}
