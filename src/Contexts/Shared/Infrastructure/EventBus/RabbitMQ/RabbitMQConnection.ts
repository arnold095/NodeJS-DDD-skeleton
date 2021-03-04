import { Channel, connect, Connection, Options, Replies } from 'amqplib';
import { injectable } from "inversify";

type EventParams = {
    routingKey: string
    messageId: string
    body: string,
};

@injectable()
export class RabbitMQConnection {
    private configuration: Options.Connect;
    private connection: Connection;
    private _channel: Channel;

    public constructor() {
        this.loadConfiguration();
    }

    private loadConfiguration(): void {
        this.configuration = {
            protocol: process.env.RABBITMQ_PROTOCOL,
            hostname: process.env.RABBITMQ_HOSTNAME,
            port: parseInt(process.env.RABBITMQ_PORT),
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
        this.connection.on('error', err => {
            console.log(`AMQP: Error: ${err.message}`);
        });
        this.connection.on('close', () => {
            console.log(`AMQP Connection closed`);
        });
    }

    public async queue(name: string, options: Options.AssertQueue): Promise<Replies.AssertQueue> {
        await this.checkConnection();
        return await this.channel.assertQueue(name, options);
    }

    public async exchange(name: string) {
        await this.checkConnection();
        await this.channel.assertExchange(name, 'topic', {
            durable: true
        });
    }

    public async checkConnection(): Promise<void> {
        if (!this.connection) {
            await this.connect();
        }
    }
}
