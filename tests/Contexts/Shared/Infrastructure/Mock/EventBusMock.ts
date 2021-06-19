import { DomainEvent, EventBus } from '../../../../../src/Contexts/Shared/Domain';

export class EventBusMock implements EventBus {
  private publishSpy = jest.fn();

  public load(): void {
    this.publishSpy();
  }

  public async publish(domainEvents: DomainEvent[]): Promise<void> {
    this.publishSpy(domainEvents);
  }
}
