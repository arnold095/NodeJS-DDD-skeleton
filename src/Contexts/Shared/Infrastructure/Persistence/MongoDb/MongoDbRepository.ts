import { Document } from 'bson';
import { Filter } from 'mongodb';

import { SessionMongoDbClient } from '../../../../../Apps/Shared/Config/MongoDbConfig';
import { isDomainImplementation } from '../../../Domain';

@isDomainImplementation()
export abstract class MongoDbRepository<TSchema extends Document> {
  public constructor(protected readonly client: SessionMongoDbClient) {}

  protected abstract collectionName(): string;

  public async searchOne(
    query: Filter<unknown>,
    projection = {},
  ): Promise<TSchema | null> {
    return this.client
      .db()
      .collection(this.collectionName())
      .findOne<TSchema>(query, projection);
  }

  public async search(query: Filter<unknown>, projection = {}): Promise<TSchema[]> {
    return this.client
      .db()
      .collection(this.collectionName())
      .find<TSchema>(query, projection)
      .toArray();
  }

  public async upsert(filter: Filter<unknown>, document: unknown): Promise<void> {
    const updateQuery = { $set: document };
    await this.client
      .db()
      .collection(this.collectionName())
      .updateOne(filter, updateQuery, { upsert: true });
  }

  public async insert(document: Document): Promise<void> {
    await this.client.db().collection(this.collectionName()).insertOne(document);
  }
}
