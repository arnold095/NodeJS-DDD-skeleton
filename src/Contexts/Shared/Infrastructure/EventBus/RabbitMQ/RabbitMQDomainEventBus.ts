import { DomainEvent, EventBus, Logger } from '@sharedDomain';
import { RabbitMQConnection } from './RabbitMQConnection';
import { RabbitMQConfigurator } from './RabbitMQConfigurator';
import { DomainEventJsonSerializer } from '../DomainEventJsonSerializer';

export class RabbitMQDomainEventBus implements EventBus {
  private readonly exchangeName = process.env.RABBITMQ_EXCHANGE ?? 'domain_events';

  public constructor(
    private readonly connection: RabbitMQConnection,
    private readonly configurator: RabbitMQConfigurator,
    private readonly logger: Logger
  ) {}

  public async load(): Promise<void> {
    this.logger.info('Declare exchange and queues...', this.exchangeName);
    await this.configurator.configure(this.exchangeName);
  }

  public async publish(domainEvents: DomainEvent[]): Promise<void> {
    domainEvents.map(async (event) => {
      await this.publisher(event);
    });
  }

  private async publisher(event: DomainEvent) {
    try {
      await this.publishEvent(event);
    } catch (err) {
      this.logger.error('An error occurred while publishing the event', err); // TODO:: Fail publisher
    }
  }

  private async publishEvent(event: DomainEvent) {
    const serializedBody = DomainEventJsonSerializer.serialize(event);
    const routingKey = event.eventName;
    const body = Buffer.from(serializedBody);
    const messageId = event.eventId;
    await this.connection.exchange(this.exchangeName);
    this.connection.channel.publish(this.exchangeName, routingKey, body, {
      messageId,
      contentType: 'application/json',
      contentEncoding: 'utf-8',
      headers: {
        redelivery_count: 0,
      },
    });
    this.logger.info("[x] Sent %s:'%s' ", routingKey, serializedBody);
  }
}
