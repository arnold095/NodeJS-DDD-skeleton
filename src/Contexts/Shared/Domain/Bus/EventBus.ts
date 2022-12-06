import { DomainEvent } from './DomainEvent';
import { EventHandler } from './EventHandler';

export abstract class EventBus {
  public abstract addHandlers(handlers: EventHandler[]): void;
  public abstract publish(domainEvent: DomainEvent[]): Promise<void>;
}
