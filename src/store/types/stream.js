import fortune from 'fortune'
import recordBase from './base'

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

export default Object.assign(recordType, recordBase)
