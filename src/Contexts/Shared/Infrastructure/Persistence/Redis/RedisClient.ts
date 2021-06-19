import { inject, injectable } from 'inversify';
import { RedisProvider } from '@sharedInfra';
import { promisify } from 'util';
import { Logger, Nullable } from '@sharedDomain';

@injectable()
export class RedisClient {
  constructor(
    @inject('RedisProvider') private readonly provider: RedisProvider,
    @inject('Logger') private readonly logger: Logger
  ) {}

  public async get<T>(key: string): Promise<Nullable<T>> {
    try {
      let foundObject;
      const client = await this.provider.client();
      const getAsync = await promisify(client.get).bind(client);
      const result = await getAsync(key);
      if (result) {
        foundObject = JSON.parse(result);
      }
      return foundObject;
    } catch (err) {
      this.logger.error('An error occurred while retrieving the data');
      throw err;
    }
  }

  public async set(key: string, body: unknown): Promise<void> {
    try {
      const client = await this.provider.client();
      const setAsync = await promisify(client.set).bind(client);
      body = JSON.stringify(body);
      if (typeof body === 'string') {
        setAsync(key, body);
      }
    } catch (err) {
      this.logger.error('An error occurred while saving the data');
      throw err;
    }
  }

  public async disconnect(): Promise<void> {
    const client = await this.provider.client();
    await client.quit();
  }
}
