import {
  AfterAll as afterAll,
  BeforeAll as beforeAll,
  Given as given,
  Then as then,
} from '@cucumber/cucumber';
import { deepStrictEqual } from 'assert';
import request, { Response, Test } from 'supertest';

import { bootstrap } from '../Utils/Bootstrap';
import { App } from './App';

let app: App;
let _request: Test;
let _response: Response;
beforeAll(async () => {
  app = await bootstrap();
});

afterAll(async () => {
  await app.stop();
});

given('I send a GET request to {string}', (route: string) => {
  _request = request(app.server.server).get(route).send();
});

then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

then('the response should be empty', () => {
  deepStrictEqual(_response.body, {});
});

then('the response content should be ok', () => {
  deepStrictEqual(_response.body, {
    status: 'ok',
  });
});
