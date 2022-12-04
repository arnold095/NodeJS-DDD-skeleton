import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import request, { Response, Test } from 'supertest';
import { App } from './App';
import { Bootstrap } from '../Utils/Bootstrap';
import { deepStrictEqual } from 'assert';

let app: App;
let _request: Test;
let _response: Response;
BeforeAll(async () => {
  app = await Bootstrap();
});

AfterAll(async () => {
  await app.stop();
});

Given('I send a GET request to {string}', (route: string) => {
  _request = request(app.server.server).get(route).send();
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
