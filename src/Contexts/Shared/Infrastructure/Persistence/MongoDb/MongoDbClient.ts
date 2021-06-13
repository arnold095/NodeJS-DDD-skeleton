import { inject, injectable } from 'inversify';
import {
  Collection,
  CollectionInsertManyOptions,
  CollectionInsertOneOptions,
  Cursor,
  FilterQuery,
  UpdateQuery,
} from 'mongodb';
import { MongoDbProvider } from '@sharedInfra';

@injectable()
export class MongoDbClient {
  protected collection!: string;

  constructor(@inject('MongoDbProvider') private provider: MongoDbProvider) {}

  public async searchOne(query: FilterQuery<unknown>): Promise<unknown> {
    const db = await this.provider.db();
    return await db.collection(this.collection).findOne(query);
  }

  public async searchAll(): Promise<Cursor<unknown>> {
    const db = await this.provider.db();
    return db.collection(this.collection).find({});
  }

  public async insertOne(
    document: unknown,
    options?: CollectionInsertOneOptions
  ): Promise<void> {
    const db = await this.provider.db();
    await db.collection(this.collection).insertOne(document, options);
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
    update: UpdateQuery<unknown>,
    options = {}
  ): Promise<void> {
    const db = await this.provider.db();
    await db.collection(this.collection).findOneAndUpdate(filter, update, options);
  }

  public async updateMany(
    filter: FilterQuery<unknown>,
    update: UpdateQuery<unknown>,
    options = {}
  ): Promise<void> {
    const db = await this.provider.db();
    await db.collection(this.collection).updateMany(filter, update, options);
  }

  public async upsert(
    criteria: FilterQuery<unknown>,
    document: Collection
  ): Promise<void> {
    const db = await this.provider.db();
    await db
      .collection(this.collection)
      .updateOne(criteria, { $set: document }, { upsert: true });
  }

  public async drop(collection: string): Promise<void> {
    const db = await this.provider.db();
    await db.collection(collection).drop();
  }

  public async disconnect(): Promise<void> {
    this.provider.close();
  }
}
