import { injectable, multiInject } from 'inversify';
import { DomainEvent, DomainEventSubscriber, EventBus } from '@sharedDomain';

@injectable()
export class InMemorySyncEventBus implements EventBus {
  private subscriptions: Map<string, [DomainEventSubscriber]> = new Map();

  public constructor(
    @multiInject('DomainEventSubscriber') private subscribers: DomainEventSubscriber[]
  ) {}

  public load(): void {
    for (const subscriber of this.subscribers) {
      for (const domainEvent of subscriber.subscribedTo()) {
        this.subscribe(domainEvent.EVENT_NAME, subscriber);
      }
    }
  }

  private subscribe(eventName: string, subscriber: DomainEventSubscriber) {
    const currentSubscriber = this.subscriptions.get(eventName);
    if (currentSubscriber) {
      currentSubscriber.push(subscriber);
    } else {
      this.subscriptions.set(eventName, [subscriber]);
    }
  }

  public async publish(domainEvents: DomainEvent[]): Promise<void> {
    for (const domainEvent of domainEvents) {
      const subscribers = this.subscriptions.get(domainEvent.eventName);
      if (subscribers) {
        for (const subscriber of subscribers) {
          await subscriber.on(domainEvent);
        }
      }
    }
  }
}
