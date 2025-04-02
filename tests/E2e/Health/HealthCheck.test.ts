import request from 'supertest';

import { TestApp } from '../TestApp';

beforeAll(async () => {
  await TestApp.start();
});

afterAll(async () => {
  await TestApp.stop();
});

describe('HealthCheck', () => {
  it('should return 200', async () => {
    await request(TestApp.httpServer).get('/api/health').expect(200);
  });
});
