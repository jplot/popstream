const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const environment = process.env.NODE_ENV || 'development'

if (environment === 'production') {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    require('./app/server')
  }
} else {
  require('./app/server')
}
