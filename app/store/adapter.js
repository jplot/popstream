const nedbAdapter = require('fortune-nedb')
const path = require('path')

const adapterName = nedbAdapter
const adapterOptions = {
  dbPath: path.join(__dirname, '..', 'db'),
}

module.exports = [adapterName, adapterOptions]
