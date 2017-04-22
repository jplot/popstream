const fortune = require('fortune')
const recordBase = require('./base')

const recordType = {
  name: 'stream',

  definition: {
    channel: ['channel', 'streams'],
    provider: ['provider', 'streams'],
    data: Buffer,
    enabled: Boolean,
    updatedAt: Date,
    createdAt: Date
  }
}

module.exports = Object.assign(recordType, recordBase)
