import CONFIG from 'config'
import adapterName from 'fortune-postgres'

const POSTGRES = CONFIG.postgres

export default [adapterName, {
  url: `postgres://${POSTGRES.get('username')}:${POSTGRES.get('password')}@${POSTGRES.get('host')}:${POSTGRES.get('port')}/${POSTGRES.get('database')}`,
}]
