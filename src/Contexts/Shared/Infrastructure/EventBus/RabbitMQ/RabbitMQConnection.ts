import { Channel, connect, Connection, Options, Replies } from 'amqplib';
import { Logger } from '@sharedDomain';

export class RabbitMQConnection {
  private configuration!: Options.Connect;
  private connection!: Connection;
  private _channel!: Channel;

  public constructor(private readonly logger: Logger) {
    this.loadConfiguration();
  }

  private loadConfiguration(): void {
    const port = parseInt(process.env.RABBITMQ_PORT ?? '5672');
    this.configuration = {
      protocol: process.env.RABBITMQ_PROTOCOL,
      hostname: process.env.RABBITMQ_HOSTNAME,
      port,
      username: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
      locale: process.env.RABBITMQ_LOCALE,
      vhost: process.env.RABBITMQ_VHOST,
    };
  }

  public get channel(): Channel {
    return this._channel;
  }

  private async connect() {
    this.connection = await connect(this.configuration);
    this._channel = await this.connection.createChannel();
    this.handleNotifications();
  }

  private handleNotifications() {
    this.connection.on('error', (err) => {
      this.logger.error(`AMQP: Error: ${err.message}`);
    });
    this.connection.on('close', () => {
      this.logger.warn(`AMQP Connection closed`);
    });
  }

  public async queue(
    name: string,
    options: Options.AssertQueue
  ): Promise<Replies.AssertQueue> {
    await this.checkConnection();
    return await this.channel.assertQueue(name, options);
  }

  public async exchange(name: string): Promise<void> {
    await this.checkConnection();
    await this.channel.assertExchange(name, 'topic', {
      durable: true,
    });
  }

  public async checkConnection(): Promise<void> {
    if (!this.connection) {
      await this.connect();
    }
  }
}
