import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import request, { Response, Test } from 'supertest';
import { MockApp } from '../MockApp';
import { deepStrictEqual } from 'assert';

let app: MockApp;
let _request: Test;
let _response: Response;

BeforeAll(async () => {
  app = new MockApp();
  await app.bootStrap();
});

AfterAll(async () => {
  await app.close();
});

Given('I send a POST request to {string} with body:', (route: string, body: string) => {
  _request = request(app.httpServer()).post(route).send(JSON.parse(body));
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  deepStrictEqual(_response.body, {});
});

Then('the response content should be:', (response) => {
  deepStrictEqual(_response.body, JSON.parse(response));
});
