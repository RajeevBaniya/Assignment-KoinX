import request from 'supertest';
import app from '../src/index.js';

describe('Worker Server', () => {
  it('should return healthy status', async () => {
    const res = await request(app).get('/healthcheck');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Worker server is healthy');
  });
});
