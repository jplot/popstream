const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const CONSTANTS = require('./app/constants')

if (CONSTANTS.use.cluster) {
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
    require('./app/server')
  }
} else {
  require('./app/server')
}
