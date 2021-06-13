import { DomainEvent } from '@/src/Contexts/Shared/Domain/Bus/Event/DomainEvent';

export const domainEvents: DomainEvent[] = [];

export function domainEvent() {
  return function (target: DomainEvent): void {
    domainEvents.push(target);
  };
}
