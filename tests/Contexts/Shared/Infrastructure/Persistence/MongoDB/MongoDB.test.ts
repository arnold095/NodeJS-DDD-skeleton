import 'reflect-metadata';
import { ConsoleLogger, MongoDbClient, MongoDbProvider } from '@sharedInfra';
import { UuidMother } from '../../../Domain/UuidMother';
import { MotherCreator } from '../../../Domain/MotherCreator';

let mongoDbClient: MongoDbClient;
const existingId = UuidMother.random();

beforeAll(async () => {
  const logger = new ConsoleLogger();
  mongoDbClient = new MongoDbClient(new MongoDbProvider(logger));
  mongoDbClient.useCollection('testing');
  const objectToSave = {
    ...MotherCreator.random().datatype.array(),
    ...{ _id: existingId },
  };
  await mongoDbClient.upsert({ _id: existingId }, objectToSave);
});

afterAll(async () => {
  await mongoDbClient.drop();
  await mongoDbClient.disconnect();
});

describe('MongoDB', () => {
  it('[FindOne] Should find results', async () => {
    expect.assertions(1);
    const foundObject = await mongoDbClient.searchOne({ _id: existingId }, {});
    expect(foundObject).toHaveProperty('_id', existingId);
  });

  it('[InsertOne] Should can save a object', async () => {
    expect.assertions(1);
    const id = UuidMother.random();
    const objectToSave = {
      ...MotherCreator.random().datatype.array(),
      ...{ _id: id },
    };
    await expect(
      mongoDbClient.upsert({ _id: id }, objectToSave)
    ).resolves.toBeUndefined();
  });

  it('[UpdateOne] Should can update a object', async () => {
    expect.assertions(2);
    const newValues = {
      updateValues: MotherCreator.random().datatype.array(),
    };
    await expect(
      mongoDbClient.updateOne({ _id: existingId }, newValues)
    ).resolves.toBeUndefined();
    const updatedObject = await mongoDbClient.searchOne({ _id: existingId }, {});
    expect(updatedObject).toHaveProperty('updateValues', newValues.updateValues);
  });
});
