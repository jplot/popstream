const fortune = require('fortune')
const recordBase = require('./base')

const recordType = {
  name: 'channel',

  definition: {
    name: String,
    user: ['user', 'channels'],
    streams: [Array('stream'), 'channel'],
    onair: Boolean,
    updatedAt: Date,
    createdAt: Date
  }
}

module.exports = Object.assign(recordType, recordBase)
