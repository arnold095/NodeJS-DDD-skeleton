import { inject, injectable } from 'inversify';
import { CollectionInsertManyOptions, Cursor, FilterQuery, UpdateQuery } from 'mongodb';
import { MongoDbProvider } from '@sharedInfra';

@injectable()
export class MongoDbClient {
  protected collection!: string;

  constructor(@inject('MongoDbProvider') private provider: MongoDbProvider) {}

  public useCollection(collection: string): void {
    this.collection = collection;
  }

  public async searchOne<T>(
    query: FilterQuery<unknown>,
    projection: Record<string, unknown>
  ): Promise<T> {
    const db = await this.provider.db();
    return db
      .collection(this.collection)
      .findOne(query, { projection })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }

  public async searchAll(): Promise<Cursor<unknown>> {
    const db = await this.provider.db();
    return db.collection(this.collection).find({});
  }

  public async insertOne(document: unknown): Promise<void> {
    const db = await this.provider.db();
    await db
      .collection(this.collection)
      .insertOne(document, { forceServerObjectId: false });
  }

  public async insertMany(
    document: Array<unknown>,
    options: CollectionInsertManyOptions
  ): Promise<void> {
    const db = await this.provider.db();
    await db.collection(this.collection).insertMany(document, options);
  }

  public async updateOne(
    filter: FilterQuery<unknown>,
    update: unknown,
    options = {}
  ): Promise<void> {
    const db = await this.provider.db();
    const updateQuery = {
      $set: update,
    };
    await db.collection(this.collection).findOneAndUpdate(filter, updateQuery, options);
  }

  public async updateMany(
    filter: FilterQuery<unknown>,
    update: UpdateQuery<unknown>,
    options = {}
  ): Promise<void> {
    const db = await this.provider.db();
    await db.collection(this.collection).updateMany(filter, update, options);
  }

  public async upsert(criteria: FilterQuery<unknown>, document: unknown): Promise<void> {
    const db = await this.provider.db();
    await db
      .collection(this.collection)
      .updateOne(criteria, { $set: document }, { upsert: true });
  }

  public async remove(criteria: FilterQuery<unknown>): Promise<void> {
    const db = await this.provider.db();
    await db.collection(this.collection).deleteOne(criteria);
  }

  public async drop(): Promise<void> {
    const db = await this.provider.db();
    await db.collection(this.collection).drop();
  }

  public async disconnect(): Promise<void> {
    this.provider.close();
  }
}
