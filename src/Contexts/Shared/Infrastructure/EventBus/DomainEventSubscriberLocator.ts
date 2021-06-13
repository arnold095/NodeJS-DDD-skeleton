import { injectable, multiInject, optional } from 'inversify';
import { DomainEventSubscriber } from '@/src/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber';
import { RabbitMQQueueNameFormatter } from '@/src/Contexts/Shared/Infrastructure/EventBus/RabbitMQ/RabbitMQQueueNameFormatter';

@injectable()
export class DomainEventSubscriberLocator {
  constructor(
    @optional()
    @multiInject('DomainEventSubscriber')
    private readonly domainEventSubscriber: DomainEventSubscriber[]
  ) {}

  public withRabbitMQQueueNamed(queueName: string): DomainEventSubscriber {
    let subscriber: DomainEventSubscriber;
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
