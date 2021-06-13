import { DomainEvent, DomainEventClass } from '@sharedDomain';

export interface DomainEventSubscriber {
  subscribedTo(): DomainEventClass[];

  on(domainEvent: DomainEvent): Promise<void>;
}
