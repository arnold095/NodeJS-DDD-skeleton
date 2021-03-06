import { Db, MongoClient, MongoClientOptions } from 'mongodb';
import { inject, injectable } from 'inversify';
import { Logger } from '@sharedDomain';

@injectable()
export class MongoDbProvider {
  private static db: Db;
  private static mongoClient: MongoClient;
  constructor(@inject('Logger') private readonly logger: Logger) {}

  public async db(): Promise<Db> {
    if (undefined === MongoDbProvider.db) {
      await this.load();
    }
    return MongoDbProvider.db;
  }

  public close(): void {
    MongoDbProvider.mongoClient.close();
  }

  private async load(): Promise<void> {
    await this.connect();
  }

  private async connect() {
    const dataBase = process.env.MONGODB_DATABASE;
    try {
      this.logger.info(`connecting to mongodb ${dataBase}...`);
      const client = new MongoClient(this.uri(), this.configuration());
      MongoDbProvider.mongoClient = await client.connect();
      MongoDbProvider.db = await client.db(dataBase);
    } catch (err) {
      this.logger.error(`connection timeout on database ${dataBase}`, err);
    }
  }

  private uri(): string {
    const {
      MONGODB_USER,
      MONGODB_PASSWORD,
      MONGODB_HOST,
      MONGODB_PORT,
      MONGODB_DATABASE_AUTH,
    } = process.env;
    return `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE_AUTH}`;
  }

  private configuration(): MongoClientOptions {
    return {
      useNewUrlParser: true,
      poolSize: parseInt(process.env.MONGODB_POOL_SIZE ?? '10'),
      useUnifiedTopology: true,
    };
  }
}
