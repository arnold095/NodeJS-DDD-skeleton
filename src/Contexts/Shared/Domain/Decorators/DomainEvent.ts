import { DomainEventClass } from '@sharedDomain';

export const domainEvents: DomainEventClass[] = [];

export function domainEvent() {
  return function (target: DomainEventClass): void {
    domainEvents.push(target);
  };
}
