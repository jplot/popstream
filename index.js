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
const server = http.createServer((request, response) =>
  listener(request, response)
  .catch(error => { console.error(error.stack) }))

store.connect().then(() => server.listen(1337))
