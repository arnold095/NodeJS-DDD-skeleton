import { DomainEvent } from './DomainEvent';
import { Class } from '../Utils/Class';

export abstract class EventHandler {
  abstract on(domainEvent: DomainEvent): Promise<void>;
  abstract subscribedTo(): Class<DomainEvent>[];
}
