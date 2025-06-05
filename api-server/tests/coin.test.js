import request from 'supertest';
import app from '../src/index.js';

describe('Crypto API', () => {
  it('should return stats for bitcoin', async () => {
    const res = await request(app).get('/stats?coin=bitcoin');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('price');
    expect(res.body).toHaveProperty('marketCap');
    expect(res.body).toHaveProperty('24hChange');
  });

  it('should return deviation for bitcoin', async () => {
    const res = await request(app).get('/deviation?coin=bitcoin');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('deviation');
  });
});