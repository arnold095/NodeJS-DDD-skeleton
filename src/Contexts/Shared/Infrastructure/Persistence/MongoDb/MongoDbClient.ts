import { Filter, ProjectionOperators } from 'mongodb';
import { MongoDbProvider } from '@sharedInfra';

export class MongoDbClient {
  protected collection!: string;

  constructor(private provider: MongoDbProvider) {}

  public useCollection(collection: string): void {
    this.collection = collection;
  }

  public async aggregate<T>(pipeline: Record<string, unknown>[]): Promise<T[]> {
    const db = await this.provider.db();
    return await db.collection(this.collection).aggregate<T>(pipeline).toArray();
  }

  public async searchOne<T>(query: Filter<unknown>, projection = {}): Promise<T> {
    const db = await this.provider.db();
    const result = await db.collection(this.collection).findOne<T>(query, projection);
    return result as T;
  }

  public async search<T>(
    query: Filter<unknown>,
    projection: Record<string, ProjectionOperators | 0 | 1 | boolean>
  ): Promise<T[]> {
    const db = await this.provider.db();
    const resourcesFound = await db
      .collection(this.collection)
      .find<T>(query, projection)
      .toArray();
    return resourcesFound.map((resource) => resource as T);
  }

  public async updateOne(
    filter: Filter<unknown>,
    update: Record<string, unknown>
  ): Promise<void> {
    const db = await this.provider.db();
    const updateQuery = { $set: update };
    await db
      .collection(this.collection)
      .findOneAndUpdate(filter, updateQuery, { upsert: true });
  }

  public async upsert(filter: Filter<unknown>, document: unknown): Promise<void> {
    const db = await this.provider.db();
    const updateQuery = { $set: document };
    await db.collection(this.collection).updateOne(filter, updateQuery, { upsert: true });
  }

  public async remove(filter: Filter<unknown>): Promise<void> {
    const db = await this.provider.db();
    await db.collection(this.collection).deleteOne(filter);
  }

  public async drop(): Promise<void> {
    const db = await this.provider.db();
    await db.collection(this.collection).drop();
  }

  public async disconnect(): Promise<void> {
    await this.provider.close();
  }
}
