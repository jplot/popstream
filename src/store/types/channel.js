import fortune from 'fortune'
import recordBase from './base'

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

export default Object.assign(recordType, recordBase)
