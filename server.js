const http = require('http');
const app = require('./app/app')
const port = process.env.PORT || 3333;
const server = http.createServer(app);
server.listen(port);
