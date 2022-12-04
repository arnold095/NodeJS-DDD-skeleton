import { EventHandler } from './EventHandler';
import { DomainEvent } from './DomainEvent';

export abstract class EventBus {
  public abstract addHandlers(handlers: EventHandler[]): void;
  public abstract publish(domainEvent: DomainEvent[]): Promise<void>;
}
