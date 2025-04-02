import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';

const EXPOSED_PORT = 27017;
const BD_NAME = 'core';
const MONGO_VERSION = 'mongo:6.0.19';

export class MongoTestContainer {
  private static container: StartedTestContainer;

  public static async start(): Promise<void> {
    if (!MongoTestContainer.container) {
      await MongoTestContainer.initializeContainer();
      MongoTestContainer.setConnectionUriToEnv();
    }
  }

  public static async stop(): Promise<void> {
    await MongoTestContainer.container.stop();
  }

  private static setConnectionUriToEnv(): void {
    const mongoUri = `mongodb://${MongoTestContainer.container.getHost()}:${MongoTestContainer.container.getMappedPort(
      EXPOSED_PORT,
    )}/${BD_NAME}`;

    process.env.MONGO_URI = mongoUri;
    process.env.MONGO_MODERATION_URI = mongoUri;
  }

  private static async initializeContainer(): Promise<void> {
    const container = new GenericContainer(MONGO_VERSION)
      .withExposedPorts(EXPOSED_PORT)
      .withEnvironment({ MONGO_INITDB_DATABASE: BD_NAME })
      .withWaitStrategy(Wait.forLogMessage(/.*waiting for connections.*/i));

    MongoTestContainer.container = await container.start();
  }
}
