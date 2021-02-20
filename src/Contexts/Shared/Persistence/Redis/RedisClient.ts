import { injectable } from "inversify";
import { RedisClient as Client } from 'redis';
import { RedisConnection } from "./RedisConnection";


@injectable()
export class RedisClient {
    private client: Client;
    constructor() {
        this.client = RedisConnection.client;
    }

    protected async get(key: string): Promise<any> {
        return new Promise(resolve => {
            this.client.get(key, (err, res) => {
                if (err) throw err;
                const result = JSON.parse(res);
                resolve(result);
            });
        });
    }

    protected async set(key: string, body: any, ttl?: number): Promise<void> {
        if (undefined === ttl) {
            ttl = parseInt(process.env.REDIS_TTL);
        }
        body = JSON.stringify(body);
        this.client.set(key, body, 'EX', ttl);
    }
}