import 'reflect-metadata';
import {
  ConsoleLogger,
  RedisClient,
  RedisProvider,
} from '../../../../../src/Contexts/Shared/Infrastructure';
import { WordMother } from '../../Domain/WordMother';
import { MotherCreator } from '../../Domain/MotherCreator';
const logger = new ConsoleLogger();
const redisProvider = new RedisProvider(logger);
const redisClient = new RedisClient(redisProvider, logger);

afterAll(async () => {
  await redisClient.disconnect();
});

describe('#Redis Storage', () => {
  it('Should save and find an object', async () => {
    const key = WordMother.random();
    const object = MotherCreator.random().datatype.array();
    await redisClient.set(key, object);
    const foundObject = await redisClient.get(key);
    expect(foundObject).not.toBeUndefined();
    expect(JSON.stringify(foundObject)).toEqual(JSON.stringify(object));
  });
});
