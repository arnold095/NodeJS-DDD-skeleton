import { injectable, multiInject, optional } from 'inversify';
import { DomainEventSubscriber } from '@sharedDomain';
import { RabbitMQQueueNameFormatter } from './RabbitMQ/RabbitMQQueueNameFormatter';

@injectable()
export class DomainEventSubscriberLocator {
  constructor(
    @optional()
    @multiInject('DomainEventSubscriber')
    private readonly domainEventSubscriber: DomainEventSubscriber[]
  ) {}

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
