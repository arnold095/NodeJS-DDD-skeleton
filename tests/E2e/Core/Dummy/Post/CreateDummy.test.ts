import request from 'supertest';

import { DummyId } from '../../../../../src/Contexts/Core/Dummy/Domain/DummyId';
import { TestApp } from '../../../TestApp';

beforeAll(async () => {
  await TestApp.start();
});

afterAll(async () => {
  await TestApp.stop();
});

describe('POST /api/geniallys', () => {
  it('should create a genially', async () => {
    await request(TestApp.httpServer)
      .put(`/api/dummies/${DummyId.random().value}`)
      .send({
        name: 'test',
      })
      .expect(204);
  });

  it('should return 400 if name is not provided', async () => {
    const response = await request(TestApp.httpServer)
      .put(`/api/dummies/${DummyId.random().value}`)
      .send({})
      .expect(400);

    expect(response.body).toEqual({
      message: 'Schema validation error',
      errors: [
        {
          message: "must have required property 'name'",
        },
      ],
    });
  });
});
