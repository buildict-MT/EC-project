const express = require('express');
const http = require('http');

const app = express();
app.use(express.json());
app.post('/test', (req, res) => {
  res.json({ received: req.body });
});

const server = app.listen(0, () => {
  const port = server.address().port;
  console.log('Server listening on port', port);

  const data = JSON.stringify({ hello: 'world' });
  const options = {
    hostname: 'localhost',
    port: port,
    path: '/test',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log('STATUS:', res.statusCode);
      console.log('BODY:', body);
      server.close();
      process.exit(res.statusCode === 200 ? 0 : 1);
    });
  });

  req.on('error', (e) => {
    console.error('Problem with request:', e.message);
    server.close();
    process.exit(1);
  });

  req.write(data);
  req.end();
});
