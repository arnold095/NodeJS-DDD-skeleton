import { MongoTestContainer } from '../../testcontainers/MongoTestContainer';

export async function setup(): Promise<void> {
  await Promise.all([MongoTestContainer.start()]);
}

export async function teardown(): Promise<void> {
  await Promise.all([MongoTestContainer.stop()]);
}
