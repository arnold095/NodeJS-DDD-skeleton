import { env } from '../../src/Apps/Config/env';
import { NumberMother, StringMother } from '../ObjectMother';

let currentMongoDbSuffix = '';
const currentSessionMongoDbSuffix = '';

const randomMongoSuffix = (): string =>
  `_${StringMother.random({
    length: 25,
  })}_${NumberMother.random({
    min: 1000,
    max: 1000000,
  })}`;

const loadMongoEnvVars = (): void => {
  if (currentMongoDbSuffix === '' && currentSessionMongoDbSuffix === '') {
    currentMongoDbSuffix = randomMongoSuffix();
    const dbName = `${process.env.MONGO_URI}${currentMongoDbSuffix}`;

    process.env.MONGO_URI = dbName;

    env.mongo.mongoUri = dbName;
    env.mongo.debug = false;
  }
};

const clearMongoEnvVars = (): void => {
  process.env.MONGO_URI = process.env.MONGO_URI?.replace(currentMongoDbSuffix, '');

  currentMongoDbSuffix = '';
};

const loadServerEnvVars = (): void => {
  const randomPort = NumberMother.random({ min: 4000, max: 10000 });

  env.app.port = randomPort;
  process.env.PORT = String(randomPort);
};

export const overrideConnectionEnvVars = (): void => {
  loadMongoEnvVars();
  loadServerEnvVars();
};

export const clearConnectionEnvVars = (): void => {
  clearMongoEnvVars();
};
