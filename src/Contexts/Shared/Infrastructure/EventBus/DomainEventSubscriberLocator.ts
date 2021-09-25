import { DomainEventSubscriber } from '@sharedDomain';
import { RabbitMQQueueNameFormatter } from './RabbitMQ/RabbitMQQueueNameFormatter';

export class DomainEventSubscriberLocator {
  constructor(private readonly domainEventSubscriber: DomainEventSubscriber[]) {}

  public withRabbitMQQueueNamed(queueName: string): DomainEventSubscriber {
    let subscriber;
    for (const eventSubscriber of this.domainEventSubscriber) {
      const mappedClassName = RabbitMQQueueNameFormatter.format(eventSubscriber);
      if (queueName === mappedClassName) {
        subscriber = eventSubscriber;
      }
    }
    if (undefined === subscriber) {
      throw new Error(`There are no subscribers for the <${queueName}> queue`);
    }
    return subscriber;
  }
}
