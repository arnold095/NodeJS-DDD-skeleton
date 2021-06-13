import { DomainEvent, DomainEventClass } from './DomainEvent';

export interface DomainEventSubscriber {
  subscribedTo(): DomainEventClass[];

  on(domainEvent: DomainEvent): Promise<void>;
}
