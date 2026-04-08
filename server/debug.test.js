const request = require('supertest');
const express = require('express');

describe('Debug Express/Supertest', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.post('/test', (req, res) => {
      console.log('Body received:', req.body);
      res.json({ received: req.body });
    });
  });

  it('should receive JSON body', async () => {
    const res = await request(app)
      .post('/test')
      .send({ hello: 'world' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.received.hello).toBe('world');
  });
});
