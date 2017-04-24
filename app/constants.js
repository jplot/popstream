const constants = {
  http: {
    port:     parseInt(process.env.POPSTREAM_HTTP_PORT) || 1337
  }
}

module.exports = constants
