const fortune = require('fortune')
const recordBase = require('./base')

const recordType = {
  name: 'provider',

  definition: {
    name: String,
    streams: [Array('stream'), 'provider'],
    updatedAt: Date,
    createdAt: Date
  }
}

module.exports = Object.assign(recordType, recordBase)
