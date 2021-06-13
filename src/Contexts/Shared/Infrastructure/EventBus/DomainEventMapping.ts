import { injectable } from 'inversify';
import { DomainEvent, domainEvents, Nullable } from '@sharedDomain';

@injectable()
export class DomainEventMapping {
  private mapping: Map<string, DomainEvent> = new Map();

  constructor() {
    this.addSubscribers(domainEvents);
  }

  public addSubscribers(domainEvents: DomainEvent[]): void {
    for (const domainEvent of domainEvents) {
      this.mapping.set(domainEvent.eventName, domainEvent);
    }
  }

  public for(name: string): Nullable<DomainEvent> {
    if (undefined === this.mapping.get(name)) {
      throw new Error(
        `The Domain event class for ${name} doesn't exists or have no subscribers`
      );
    }
    return this.mapping.get(name);
  }
}
