const path = require('path')
const CONFIG =  require('config')
const POSTGRES = CONFIG.postgres

let adapterName = null
let adapterOptions = {}

if (CONFIG.get('use.postgres')) {
  adapterName = require('fortune-postgres')
  adapterOptions = {
    url: `postgres://${POSTGRES.get('username')}:${POSTGRES.get('password')}@${POSTGRES.get('host')}:${POSTGRES.get('port')}/${POSTGRES.get('database')}`,
  }
} else {
  adapterName = require('fortune-nedb')
  adapterOptions = {
    dbPath: path.join(__dirname, '..', 'db'),
  }
}

module.exports = [adapterName, adapterOptions]
