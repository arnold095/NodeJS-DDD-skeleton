import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import { deepStrictEqual } from 'assert';
import request, { Response, Test } from 'supertest';

import { bootstrap } from '../Utils/Bootstrap';
import { App } from './App';

let app: App;
let _request: Test;
let _response: Response;
BeforeAll(async () => {
  app = await bootstrap();
});

AfterAll(async () => {
  await app.stop();
});

Given('I send a GET request to {string}', (route: string) => {
  _request = request(app.server.server).get(route).send();
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = request(app.server.server)
    .put(route)
    .send(JSON.parse(body) as Record<string, unknown>);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  deepStrictEqual(_response.body, {});
});

Then('the response content should be ok', () => {
  deepStrictEqual(_response.body, {
    status: 'ok',
  });
});
