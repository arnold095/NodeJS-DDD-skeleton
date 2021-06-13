import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';
import { inject, injectable } from 'inversify';
import { Logger } from '@sharedDomain';

export type RedisTypes = {
  port: number;
  host: string;
  db: number;
};
@injectable()
export class RedisProvider {
  private _client!: RedisClient;
  private config!: RedisTypes;

  constructor(@inject('Logger') private readonly logger: Logger) {}

  public async client(): Promise<RedisClient> {
    if (!this._client) {
      await this.connect();
    }
    return this._client;
  }

  private async connect(): Promise<void> {
    this.loadConfiguration();
    this._client = createClient(this.config);
    await this.onConnect();
  }

  private loadConfiguration() {
    const { REDIS_PORT, REDIS_HOST, REDIS_DEFAULT_DB } = process.env;
    this.config = {
      host: REDIS_HOST ?? '127.0.0.1',
      port: parseInt(REDIS_PORT ?? '6379'),
      db: parseInt(REDIS_DEFAULT_DB ?? '0'),
    };
  }

  private async onConnect(): Promise<void> {
    try {
      this.logger.info(`Connecting to redis`);
      const on = await promisify(this._client.on).bind(this._client);
      await on('connect');
      this.logger.info(
        `Connection to redis has been successfully established in port`,
        process.env.REDIS_PORT
      );
    } catch (err) {
      this.logger.error("Can't connect to redis", err);
      throw err;
    }
  }
}
