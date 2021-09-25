/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RedisProvider } from '@sharedInfra';

export class RedisClient {
  constructor(private readonly provider: RedisProvider) {}

  public async get(key: string): Promise<any> {
    const client = await this.provider.client();
    return await client.get(key);
  }

  public async set(key: string, body: any, ttl?: number): Promise<void> {
    const client = await this.provider.client();
    if (undefined === ttl) {
      ttl = parseInt(process.env.REDIS_TTL || '3600000');
    }
    body = JSON.stringify(body);
    await client.set(key, body, 'EX', ttl);
  }

  public async del(key: string) {
    const client = await this.provider.client();
    client.del(key);
  }

  public async disconnect(): Promise<void> {
    const client = await this.provider.client();
    client.disconnect();
  }
}
