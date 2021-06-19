import 'reflect-metadata';
import { EventBus } from '../../../../../src/Contexts/Shared/Domain';
import { DomainEventMock, DomainEventSubscriberMock } from '../Mock/DomainEventMock';
import { UuidMother } from '../../Domain/UuidMother';
import { InMemorySyncEventBus } from '../../../../../src/Contexts/Shared/Infrastructure';
let eventBus: EventBus;

describe('InMemorySyncEventBus', () => {
  beforeEach(async () => {
    const subscriber = new DomainEventSubscriberMock();
    eventBus = new InMemorySyncEventBus([subscriber]);
    eventBus.load();
  });

  it('Should call the subscribed consumer when an event is published', async () => {
    expect.assertions(1);
    const event = new DomainEventMock(UuidMother.random());
    await expect(eventBus.publish([event])).resolves.toBeUndefined();
  });
});
