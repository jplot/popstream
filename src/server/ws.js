import CONFIG from 'config'
import fortuneWS from 'fortune-ws'
import logger from '../logger'
import store from '../store'

export default {
  start() {
    let clients = null

    const optionsWS = {
      port: CONFIG.get('ws.port')
    }
    const server = fortuneWS(store, (state, changes) => {
      const recordAction = Object.keys(changes)[0]
      const recordType = Object.keys(changes[recordAction])[0]
      const records = changes[recordAction][recordType]

      for (const record of records) {
        const recordId = changes.delete ? record : record.id
        const recordPath = `/${recordType}/${recordId}`

        logger.info('[WS]', `broadcasted ${recordAction.toUpperCase()} ${recordPath}`)
      }

      if (changes) return changes
      return state
    }, optionsWS)

    logger.info('[WS]', `started on port ${CONFIG.get('ws.port')}`)
  }
}
