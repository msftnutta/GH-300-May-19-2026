import request from 'supertest';
import app from '../src/app.js';

describe('GET /', () => {
  it('responds with Hello, World! JSON', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Hello, World!' });
  });
});
