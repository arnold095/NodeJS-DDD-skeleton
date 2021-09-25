import { RedisClient } from '@sharedInfra';
import { Arranger } from '../../../../MyApp/Shared/Infratructure/Arranger';
import { WordMother } from '../../../Domain/WordMother';
import { MotherCreator } from '../../../Domain/MotherCreator';

let redisClient: RedisClient;

beforeAll(async () => {
  await Arranger.run();
  redisClient = Arranger.container.get('Shared.RedisClient');
});
afterAll(async () => {
  await redisClient.disconnect();
});

describe('#Redis Storage', () => {
  it('Should can save a object', async () => {
    const key = WordMother.random();
    const object = MotherCreator.random().datatype.array();
    await redisClient.set(key, object);
    const foundObject = await redisClient.get(key);
    expect(foundObject).not.toBeUndefined();
    expect(foundObject).toEqual(JSON.stringify(object));
  });
});
