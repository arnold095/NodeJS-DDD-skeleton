import { injectable } from 'inversify';
import { DomainEventClass, domainEvents } from '@sharedDomain';

@injectable()
export class DomainEventMapping {
  private mapping: Map<string, DomainEventClass> = new Map();

  constructor() {
    this.addSubscribers(domainEvents);
  }

  public addSubscribers(domainEvents: DomainEventClass[]): void {
    for (const domainEvent of domainEvents) {
      this.mapping.set(domainEvent.EVENT_NAME, domainEvent);
    }
  }

  public for(name: string): DomainEventClass {
    const domainEvent = this.mapping.get(name);
    if (undefined === domainEvent) {
      throw new Error(
        `The Domain event class for ${name} doesn't exists or have no subscribers`
      );
    }
    return domainEvent;
  }
}
