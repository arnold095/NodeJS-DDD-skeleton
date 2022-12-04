import { DomainEvent } from '../Bus/DomainEvent';

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[] = [];

  public pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }

  protected record(domainEvent: DomainEvent): void {
    this.domainEvents = [...this.domainEvents, domainEvent];
  }
}
