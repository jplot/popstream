import CONFIG from 'config'
import cluster from 'cluster'
import os from 'os'
import server from './server'

const numCPUs = os.cpus().length

if (Number(CONFIG.get('use.cluster')) === 1) {
  if (cluster.isMaster) {
    console.log(`[Master:${process.pid}]`, `running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`[Worker:${worker.process.pid}]`, `died`);
    });
  } else {
    server.start()
  }
} else {
  server.start()
}
