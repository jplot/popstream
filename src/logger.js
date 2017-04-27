import CONFIG from 'config'

export default {
  info(...message) {
    let name = 'Serve'
    if (CONFIG.get('use.cluster')) name = `Worker:${process.pid}`

    console.log(`[${name}]`, ...message)
  }
}
