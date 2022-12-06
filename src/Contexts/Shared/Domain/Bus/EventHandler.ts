import { Class } from '../Utils/Class';
import { DomainEvent } from './DomainEvent';

export abstract class EventHandler {
  abstract on(domainEvent: DomainEvent): Promise<void>;
  abstract subscribedTo(): Class<DomainEvent>[];
}
