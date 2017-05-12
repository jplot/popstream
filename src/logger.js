import CONFIG from 'config'

export default {
  info(...message) {
    let name = 'Serve'
    if (parseInt(CONFIG.get('use.cluster')) === 1) name = `Worker:${process.pid}`

    console.log(`[${name}]`, ...message)
  }
}
