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
      this.mapping.set(domainEvent.eventName, domainEvent);
    }
  }

  public for(name: string): DomainEventClass {
    if (undefined === this.mapping.get(name)) {
      throw new Error(
        `The Domain event class for ${name} doesn't exists or have no subscribers`
      );
    }
    return this.mapping.get(name);
  }
}
