const http = require('http');

const handler = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  const responseData = {
    message: 'Hello World',
  };
  response.end(JSON.stringify(responseData));
};

const www = http.createServer(handler);
www.listen(8080);

console.log('Demo Server Started at port 8080');
