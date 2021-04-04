import { inject, injectable } from "inversify";
import { CollectionInsertManyOptions, CollectionInsertOneOptions } from "mongodb";
import { MongoDbProvider } from "@/Contexts/Shared/Infrastructure/Persistence/MongoDb/MongoDbProvider";

@injectable()
export abstract class MongoDbClient {

    constructor(
        @inject('MongoDbProvider') private provider: MongoDbProvider,
    ) {
    }

    public async searchOne(collection: string, query: any): Promise<any> {
        const db = await this.provider.db();
        return await db.collection(collection).findOne(query);
    }

    public async searchAll(collection: string): Promise<any> {
        const db = await this.provider.db();
        return db.collection(collection).find({});
    }

    public async insertOne(collection: string, document: any, options: CollectionInsertOneOptions): Promise<void> {
        const db = await this.provider.db();
        await db.collection(collection).insertOne(document, options);
    }

    public async insertMany(collection: string, document, options: CollectionInsertManyOptions) {
        const db = await this.provider.db();
        await db.collection(collection).insertMany(document, options);
    }

    public async updateOne(filter, update, options = {}, collection: string): Promise<void> {
        const db = await this.provider.db();
        new Promise((resolve, reject) => {
            db.collection(collection).findOneAndUpdate(filter, update, options, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    public async updateMany(filter, update, options = {}, collection: string) {
        const db = await this.provider.db();
        await db.collection(collection).updateMany(filter, update, options);
    }
}
