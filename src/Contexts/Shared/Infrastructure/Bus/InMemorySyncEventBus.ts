import { DomainEvent, EventBus, EventHandler, isService } from '../../Domain';

@isService()
export class InMemorySyncEventBus implements EventBus {
  private readonly subscriptions: Map<string, [EventHandler]> = new Map();

  public addHandlers(handlers: EventHandler[]): void {
    for (const handler of handlers) {
      for (const domainEvent of handler.subscribedTo()) {
        const event = domainEvent as unknown as DomainEvent;
        const currentSubscriber = this.subscriptions.get(event.eventName);

        if (currentSubscriber) {
          currentSubscriber.push(handler);
        } else {
          this.subscriptions.set(event.eventName, [handler]);
        }
      }
    }
  }

  public async publish(domainEvents: DomainEvent[]): Promise<void> {
    for await (const domainEvent of domainEvents) {
      const subscribers = this.subscriptions.get(domainEvent.eventName);
      if (subscribers) {
        await Promise.all(
          subscribers.map(async subscriber => {
            await subscriber.on(domainEvent);
          }),
        );
      }
    }
  }
}
