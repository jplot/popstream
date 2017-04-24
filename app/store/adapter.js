const path = require('path')
const CONSTANTS = require('../constants')
const POSTGRES = CONSTANTS.postgres

let adapterName = null
let adapterOptions = {}

if (CONSTANTS.use.postgres) {
  adapterName = require('fortune-postgres')
  adapterOptions = {
    url: `postgres://${POSTGRES.username}:${POSTGRES.password}@${POSTGRES.host}:${POSTGRES.port}/${POSTGRES.database}`,
  }
} else {
  adapterName = require('fortune-nedb')
  adapterOptions = {
    dbPath: path.join(__dirname, '..', 'db'),
  }
}

module.exports = [adapterName, adapterOptions]
