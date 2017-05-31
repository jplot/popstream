import CONFIG from 'config'
import cluster from 'cluster'
import os from 'os'
import server from './server'
import debug from './logger'

const logger = debug()
const numCPUs = os.cpus().length

if (Number(CONFIG.get('use.cluster')) === 1) {
  if (cluster.isMaster) {
    logger.info(`running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      logger.worker(worker.process, `died`);
    });
  } else {
    server.start()
  }
} else {
  server.start()
}
