import Redis, { RedisOptions } from 'ioredis';

export class RedisProvider {
  private static client: Redis.Redis;
  private config!: RedisOptions;

  public async client(): Promise<Redis.Redis> {
    if (undefined === RedisProvider.client) {
      await this.connect();
    }
    return RedisProvider.client;
  }

  protected async connect(): Promise<void> {
    this.loadConfiguration();
    RedisProvider.client = new Redis(this.config);
  }

  private loadConfiguration() {
    const { REDIS_PORT, REDIS_HOST, REDIS_DEFAULT_DB, REDIS_FAMILY, REDIS_PASSWORD } =
      process.env;
    this.config = {
      host: REDIS_HOST,
      port: parseInt(REDIS_PORT ?? '3679'),
      db: parseInt(REDIS_DEFAULT_DB ?? '0'),
      family: REDIS_FAMILY ? parseInt(REDIS_FAMILY) : undefined,
      password: REDIS_PASSWORD,
    };
  }
}
