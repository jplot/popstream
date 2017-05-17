import CONFIG from 'config'
import pusher from './redis/pusher'
import puller from './redis/puller'

export default {
  start(CHANNEL) {
    return {
      push: pusher.start(CHANNEL),
      pull: puller.start(CHANNEL)
    }
  }
}
