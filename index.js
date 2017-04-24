const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const env = require('./app/env')

if (env.isProduction) {
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
