import CONFIG from 'config'
import redis from 'redis'
import os from 'os'
import msgpack from 'msgpack-lite'
import ws from '../ws'
import debug from '../../logger'

const logger = debug('Redis', 'Pusher')

export default {
  start(CHANNEL) {
    const redisHost = {
      host: CONFIG.get('redis.host'),
      port: CONFIG.get('redis.port'),
      return_buffers: true
    }
    const client = redis.createClient(redisHost);

    client.on('ready', () => {
      logger.info('ready')
    })

    return ((changes) => {
      const { action, records } = ws._recordsFormat(changes)

      for (const record of records) {
        logger.info(`published ${action} ${record}`)
      }

      const data = msgpack.encode({
        worker: {
          hostname: os.hostname(),
          pid: process.pid
        },
        changes: changes
      })

      client.publish(CHANNEL, data)
    })
  }
}
