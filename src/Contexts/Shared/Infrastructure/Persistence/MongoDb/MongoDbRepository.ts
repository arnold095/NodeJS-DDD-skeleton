import {
  Collection,
  type Document,
  type Filter,
  FindOptions,
  type OptionalUnlessRequiredId,
  type WithId,
} from 'mongodb';

import { CoreMongoDbClient } from '../../../../../Apps/Config/MongoDbConfig';
import { isDomainImplementation } from '../../../Domain';

@isDomainImplementation()
export abstract class MongoDbRepository<TSchema extends Document> {
  protected abstract collectionName: string;

  constructor(protected readonly client: CoreMongoDbClient) {}

  protected collection(): Collection<TSchema> {
    return this.client.db().collection(this.collectionName);
  }

  public async searchOne(
    query: Filter<TSchema>,
    options: FindOptions = {},
  ): Promise<WithId<TSchema> | null> {
    return this.collection().findOne(query, options);
  }

  public async search(
    query: Filter<TSchema>,
    options: FindOptions = {},
  ): Promise<TSchema[]> {
    return this.collection().find<TSchema>(query, options).toArray();
  }

  public async exists(query: Filter<TSchema>): Promise<boolean> {
    const result = await this.collection().findOne<TSchema>(query, {
      projection: { _id: true },
    });

    return !!result;
  }

  public async insert(document: OptionalUnlessRequiredId<TSchema>): Promise<void> {
    await this.collection().insertOne(document, {
      ignoreUndefined: true,
    });
  }

  public async updateOne(query: Filter<TSchema>, update: TSchema): Promise<void> {
    await this.collection().updateOne(
      query,
      {
        $set: update,
      },
      {
        ignoreUndefined: true,
      },
    );
  }

  public async updateInBulk(documents: TSchema[]): Promise<void> {
    await this.collection().bulkWrite(
      documents.map(document => ({
        updateOne: {
          filter: {
            _id: document._id,
          },
          update: {
            $set: document,
          },
        },
      })),
      { ignoreUndefined: true },
    );
  }

  public async upsert(filter: Filter<TSchema>, document: TSchema): Promise<void> {
    const updateQuery = { $set: document };

    await this.collection().updateOne(filter, updateQuery, { upsert: true });
  }
}
