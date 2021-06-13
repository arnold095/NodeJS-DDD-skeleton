import { DomainEvent } from '@sharedDomain';

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[];

  constructor() {
    this.domainEvents = [];
  }

  public pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];
    return domainEvents;
  }

  protected record(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }
}
