import RecordBase from './base'

export default class Channel extends RecordBase {
  static get NAME() {
    return 'channel'
  }

  static get DEFINITION() {
    return {
      name: String,
      user: ['user', 'channels'],
      streams: [Array('stream'), 'channel'],
      onair: Boolean,
      updatedAt: Date,
      createdAt: Date
    }
  }
}
