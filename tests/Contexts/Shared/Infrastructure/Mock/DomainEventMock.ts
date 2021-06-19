import {
  DomainEvent,
  DomainEventClass,
  DomainEventSubscriber,
} from '../../../../../src/Contexts/Shared/Domain';

export class DomainEventMock extends DomainEvent {
  static EVENT_NAME = 'domain_event_mooc';

  constructor(id: string) {
    super(id, DomainEventMock.EVENT_NAME);
  }

  toPrimitives(): Record<string, unknown> {
    throw new Error('Method not implemented.');
  }
}

export class DomainEventSubscriberMock implements DomainEventSubscriber {
  async on(domainEvent: DomainEvent): Promise<void> {
    console.info('Consumer event...', domainEvent);
  }

  subscribedTo(): DomainEventClass[] {
    return [DomainEventMock];
  }
}
