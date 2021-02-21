import { Channel, connect, Connection, Options, Replies } from 'amqplib';
import { injectable } from 'inversify';

type EventParams = {
    routingKey: string
    messageId: string
    body: string,
};

@injectable()
export class RabbitMQConnection {
    private configuration: Options.Connect;
    private connection: Connection;
    private channel: Channel;

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

    public async connect(): Promise<void> {
        this.connection = await connect(this.configuration);
        this.channel = await this.connection.createChannel();
        this.handleNotifications();
    }

    private handleNotifications() {
        this.connection.on('error', err => {
            console.log(`AMQP: Error: ${err.message}`);
        });
        this.connection.on('close', () => {
            console.log(`AMQP: Connection closed`);
        });
    }

    public async queue(name: string): Promise<Replies.AssertQueue> {
        await this.checkConnection();
        return await this.channel.assertQueue(name, {});
    }

    public async exchange(name: string, eventParams: EventParams): Promise<void> {
        await this.checkConnection();
        await this.channel.assertExchange(name, 'direct');
        this.channel.publish(name, eventParams.routingKey, Buffer.from(eventParams.body), {
            messageId: eventParams.messageId,
            contentType: 'application/json',
            contentEncoding: 'utf-8'
        });
    }

    private async checkConnection(): Promise<void> {
        if (!this.connection) {
            await this.connect();
        }
    }
}
