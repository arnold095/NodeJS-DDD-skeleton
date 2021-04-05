import { inject, injectable } from "inversify";
import { DomainEventJsonDeserializer } from "@/Contexts/Shared/Infrastructure/EventBus/DomainEventJsonDeserializer";
import { RabbitMQConnection } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQConnection";
import { DomainEventSubscriber } from "@/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber";
import { ConsumeMessage } from "amqplib/properties";
import { RabbitMQExchangeNameFormatter } from "@/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQExchangeNameFormatter";

@injectable()
export class RabbitMQDomainEventsConsumer {
    private readonly exchangeName: string;
    private readonly maxRetries: number;

    public constructor(
        @inject('RabbitMQConnection') private readonly connection: RabbitMQConnection,
        @inject('DomainEventJsonDeserializer') private readonly deserializer: DomainEventJsonDeserializer
    ) {
        this.exchangeName = process.env.RABBITMQ_EXCHANGE;
        this.maxRetries = parseInt(process.env.RABBITMQ_MAX_RETRIES);
    }

    public async consume(subscriber: DomainEventSubscriber, queueName): Promise<void> {
        try {
            await this.connection.checkConnection();
            await this.connection.channel.consume(queueName, async msg => {
                await this.consumer(msg, subscriber, queueName);
                this.connection.channel.ack(msg);
            });
        } catch (err) {
            // We don't want to raise an error if there are no messages in the queue
            console.log(err);
        }
    }

    private async consumer(msg: ConsumeMessage, subscriber: DomainEventSubscriber,
                           queueName: string): Promise<void> {
        const content = msg.content.toString();
        const event = this.deserializer.deserialize(content);
        try {
            await subscriber.on(event);
        } catch (error) {
            await this.handleConsumptionError(msg, queueName);
            throw error;
        }
    }
    //TODO: implement failed queue publishing
    private async handleConsumptionError(msg: ConsumeMessage, queue: string) {
        if (this.hasBeenRedeliveredToMuch(msg)) {
            this.sendToDeadLetter(msg, queue);
        } else {
            this.sendToRetry(msg, queue);
        }
        this.connection.channel.ack(msg);
    }

    private hasBeenRedeliveredToMuch(msg: ConsumeMessage) {
        const retries = msg.properties.headers['redelivery_count'] ?? 0;
        return retries >= this.maxRetries;
    }

    private sendToRetry(msg: ConsumeMessage, queue: string) {
        const exchangeName = RabbitMQExchangeNameFormatter.retry(this.exchangeName);
        this.sendMessageTo(exchangeName, msg, queue);
    }

    private sendToDeadLetter(msg: ConsumeMessage, queue: string) {
        const exchangeName = RabbitMQExchangeNameFormatter.deadLetter(this.exchangeName);
        this.sendMessageTo(exchangeName, msg, queue);
    }

    private sendMessageTo(exchangeName: string, msg: ConsumeMessage, queue: string) {
        const retries = msg.properties.headers.redelivery_count ?? 0;
        this.connection.channel.publish(exchangeName, queue, Buffer.from(
            msg.content
        ), {
            messageId: msg.properties.messageId,
            contentType: msg.properties.contentType,
            contentEncoding: msg.properties.contentEncoding,
            headers: {
                redelivery_count: parseInt(retries) + 1
            }
        });
    }
}
