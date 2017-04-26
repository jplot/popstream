const fortuneWS = require('fortune-ws')
const store = require('../store')
const logger = require('../logger')
const redis = require('./redis')
const CONSTANTS = require('../constants')

const servers = {
  start() {
    let clients = null

    const optionsWS = {
      port: CONSTANTS.ws.port
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

    logger.info('[WS]', 'started')
  }
}

module.exports = servers
