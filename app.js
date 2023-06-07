const http = require('http');
const handler = require('./router')

const server = http.createServer(handler.requestHandler)

server.listen(3000);