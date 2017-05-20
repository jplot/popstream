import RecordBase from './base'

export default class extends RecordBase {
  static get NAME() {
    return 'stream'
  }

  static get DEFINITION() {
    return {
      channel: ['channel', 'streams'],
      provider: ['provider', 'streams'],
      data: Buffer,
      enabled: Boolean,
      updatedAt: Date,
      createdAt: Date
    }
  }
}
