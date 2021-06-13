import { DomainEvent } from '@sharedDomain';

export interface EventBus {
  publish(domainEvents: DomainEvent[]): Promise<void>;

  load(): void;
}
