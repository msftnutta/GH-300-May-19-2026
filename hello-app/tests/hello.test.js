import request from 'supertest';
import app from '../src/app.js';

describe('GET /', () => {
  it('responds with an HTML page containing Hello, World!', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
    expect(res.text).toContain('Hello, World!');
    expect(res.text).toContain('bootstrap');
  });
});

describe('GET /api', () => {
  it('responds with Hello, World! JSON', async () => {
    const res = await request(app).get('/api');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Hello, World!' });
  });
});
