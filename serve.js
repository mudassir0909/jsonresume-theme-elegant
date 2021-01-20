const http = require('http');
const theme = require('./index.js');

const PORT = 8888;

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(theme.render());
}).listen(PORT);

console.log(`Preview: http://localhost:${PORT}/`);
console.log('Serving..');
