const fortune = require('fortune')
const adapter = require('./store/adapter')

// Record types
const User = require('./store/types/user')
const Channel = require('./store/types/channel')
const Provider = require('./store/types/provider')
const Stream = require('./store/types/stream')
const recordTypes = {}
const transforms = {}

for (let type of [User, Channel, Provider, Stream]) {
  recordTypes[type.name] = type.definition
  transforms[type.name] = [ type.input, type.output ]
}

const store = fortune(recordTypes, {
  hooks: transforms,
  adapter: adapter,
})

module.exports = store
