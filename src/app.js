const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const chunks = [];

    req.on('data', chunk => {
      const buf = Buffer.from(chunk);
      const str = buf.toString();
      chunks.push(str);
      const obj = JSON.parse(chunks)
      const value1 = obj.num1;
      const value2 = obj.num2;
      if (Number.isInteger(value1) && Number.isInteger(value2)) {
        if (value1 <= 0) {
          res.writeHead(404, {'Content-type': 'text/plain' });
          res.end('this is not a valid expression');
        }
        else if (value2 < 0) {
          res.writeHead(404, {'Content-type': 'text/plain' });
          res.end('this is not a valid expression');
        }
        else {
          const result = Math.pow(num1, num2);
          res.writeHead(200, {'Content-type':'text/plain'});
          res.end(`The result is ${result}`);
        }

      } else {
        res.writeHead(400, { 'Content-type': 'text/plain' });
        res.end('this is a bad request');
      }

    });
  }
});

module.exports = server;
