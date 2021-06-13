import { DomainEvent } from './DomainEvent';

export interface EventBus {
  publish(domainEvents: DomainEvent[]): Promise<void>;

  load(): void;
}
