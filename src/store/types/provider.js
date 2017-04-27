import fortune from 'fortune'
import recordBase from './base'

const recordType = {
  name: 'provider',

  definition: {
    name: String,
    streams: [Array('stream'), 'provider'],
    updatedAt: Date,
    createdAt: Date
  }
}

export default Object.assign(recordType, recordBase)
