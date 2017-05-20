import RecordBase from './base'

export default class extends RecordBase {
  static get NAME() {
    return 'provider'
  }

  static get DEFINITION() {
    return {
      name: String,
      streams: [Array('stream'), 'provider'],
      updatedAt: Date,
      createdAt: Date
    }
  }
}
