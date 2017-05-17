import CONFIG from 'config'
import fortune from 'fortune'

// Adapters
import adapterNedb from './store/adapters/nedb'
import adapterPostgres from './store/adapters/postgres'

// Record types
import User from './store/types/user'
import Channel from './store/types/channel'
import Provider from './store/types/provider'
import Stream from './store/types/stream'

const recordTypes = {}
const transforms = {}

for (let type of [User, Channel, Provider, Stream]) {
  recordTypes[type.name] = type.definition
  transforms[type.name] = [type.input, type.output]
}

let adapter = null

if (Number(CONFIG.get('use.postgres')) === 1) {
  adapter = adapterPostgres
} else {
  adapter = adapterNedb
}

export default fortune(recordTypes, {
  hooks: transforms,
  adapter: adapter,
})
