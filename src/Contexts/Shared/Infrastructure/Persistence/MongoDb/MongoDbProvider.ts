import { Db, MongoClient, MongoClientOptions } from "mongodb";
import { injectable } from "inversify";

@injectable()
export class MongoDbProvider {
    private static db: Db;

    public async db(): Promise<Db> {
        if (undefined === MongoDbProvider.db) {
            await this.load();
        }
        return MongoDbProvider.db;
    }

    private async load(): Promise<void> {
        await this.connect();
    }

    private async connect() {
        const dataBase = process.env.MONGODB_DATABASE;
        try {
            console.log(`connecting to mongodb ${dataBase}...`);
            const client = new MongoClient(this.uri(), this.configuration());
            await client.connect();
            MongoDbProvider.db = await client.db(dataBase);
        } catch (err) {
            console.log(`connection timeout on database ${dataBase}`, err);
        }
    }

    private uri(): string {
        const {MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, MONGODB_DATABASE_AUTH} = process.env;
        return `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE_AUTH}`;
    }

    private configuration(): MongoClientOptions {
        const {MONGODB_POOL_SIZE} = process.env;
        return {
            useNewUrlParser: true,
            poolSize: parseInt(MONGODB_POOL_SIZE),
            useUnifiedTopology: true,
        };
    }
}
