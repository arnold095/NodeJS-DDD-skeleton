import { createClient, RedisClient } from 'redis';

export type RedisTypes = {
  port: number;
  host: string;
  db: number;
};

export class RedisConnection {
  private static _client: RedisClient;
  private static config: RedisTypes;

  public static async connect(): Promise<void> {
    this.loadConfiguration();
    this.loadClient();
    await this.onConnect();
  }

  public static get client(): RedisClient {
    return this._client;
  }

  private static loadConfiguration() {
    const { REDIS_PORT, REDIS_HOST, REDIS_DEFAULT_DB } = process.env;
    this.config = {
      host: REDIS_HOST,
      port: parseInt(REDIS_PORT),
      db: parseInt(REDIS_DEFAULT_DB),
    };
  }

  private static loadClient() {
    this._client = createClient(this.config);
  }

  private static async onConnect(): Promise<void> {
    await new Promise((resolve) => {
      this._client.on('connect', () => {
        resolve('ok');
      });
    });
  }
}
