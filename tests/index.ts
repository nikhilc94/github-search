import axios from 'axios';
import { response } from 'express';
import redis from 'redis-mock';
import request from 'supertest';

import { app } from '../index';

jest.mock('redis', () => redis);
jest.mock('axios');

describe('GET /api/clear-cache', () => {
  it('clears redis cache successfully', async () => {
    const result = await request(app).get('/api/clear-cache');
    expect(result.status).toEqual(200);
    expect(JSON.parse(result.text)).toEqual({
      message: 'Redis cache cleared!',
    });
  });
});

describe('POST /api/search', () => {
  it('returns bad request when request is incorrect', async () => {
    const result = await request(app)
      .post('/api/search')
      .send({ type: 'any', text: 'test' });
    expect(result.status).toEqual(400);
    expect(JSON.parse(result.text)).toEqual({
      message: 'Invalid search type/search string!',
    });
  });

  it('returns response from GitHub API', async () => {
    const apiMockData = { items: [] };
    (axios as any).get.mockImplementationOnce(() =>
      Promise.resolve({ data: apiMockData })
    );
    const result = await request(app)
      .post('/api/search')
      .send({ type: 'users', text: 'Nikhil' });
    expect(result.status).toEqual(200);
    expect(JSON.parse(result.text)).toEqual(apiMockData);
  });
});
