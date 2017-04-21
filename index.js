const cluster = require('cluster')
const numCPUs = require('os').cpus().length

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
  const fortune = require('fortune')
  const http = require('http')
  const fortuneHTTP = require('fortune-http')

  const store = fortune({
    user: {
      name: String,

      // Following and followers are inversely related (many-to-many).
      following: [ Array('user'), 'followers' ],
      followers: [ Array('user'), 'following' ],

      // Many-to-one relationship of user posts to post author.
      posts: [ Array('post'), 'author' ]
    },
    post: {
      message: String,

      // One-to-many relationship of post author to user posts.
      author: [ 'user', 'posts' ]
    }
  })

  const listener = fortuneHTTP(store)
  const server = http.createServer((request, response) => {
    console.log(`Worker ${process.pid} requested ${request.method} ${request.url} for ${request.client.remoteAddress}`)
    listener(request, response).catch(error => { console.error(error.stack) })
  })

  store.connect().then(() => server.listen(1337))

  console.log(`Worker ${process.pid} started`);
}
