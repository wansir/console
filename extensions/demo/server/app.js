const http = require('http');
const fs = require('fs');

const handler = (request, response) => {
  if (request.url == '/dist/demo.kubesphere.io/v1alpha2/index.js') {
    console.log(request.url);
    fs.readFile('./dist/index.js', function (error, content) {
      if (error) {
        console.log(error);
        response.writeHead(500);
        response.end(error);
        response.end();
      } else {
        response.writeHead(200, { 'Content-Type': 'text/javascript' });
        response.end(content, 'utf-8');
      }
    });
    return;
  }

  response.writeHead(200, { 'Content-Type': 'application/json' });
  const responseData = {
    message: 'Hello World',
  };
  response.end(JSON.stringify(responseData));
};

const www = http.createServer(handler);
www.listen(8080);

console.log('Demo Server Started at port 8080');
