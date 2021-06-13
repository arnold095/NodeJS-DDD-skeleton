import { DomainEvent } from '@sharedDomain';

export const domainEvents: DomainEvent[] = [];

export function domainEvent() {
  return function (target: DomainEvent): void {
    domainEvents.push(target);
  };
}
