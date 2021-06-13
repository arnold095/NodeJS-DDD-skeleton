import { injectable } from 'inversify';
import { domainEvents } from '@/src/Contexts/Shared/Domain/Decorators/DomainEvent';
import { DomainEvent } from '@/src/Contexts/Shared/Domain/Bus/Event/DomainEvent';
import { Nullable } from '@/src/Contexts/Shared/Domain/Utils/Nullable';

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
