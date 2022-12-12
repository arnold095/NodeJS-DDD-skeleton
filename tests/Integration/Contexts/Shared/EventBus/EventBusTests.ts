import { EventBus } from '../../../../../src/Contexts/Shared/Domain';
import { DummyEvent } from './DummyEvent';

export const eventBusTests = (eventBus: EventBus): void => {
  describe(`Common tests for ${eventBus.constructor.name}`, () => {
    describe('Publish an event', () => {
      it('should publish the event and handlers should react to it', async () => {
        const handler = {
          subscribedTo: () => [DummyEvent],
          on: jest.fn(),
        };

        eventBus.addHandlers([handler]);

        await eventBus.publish([DummyEvent.random()]);

        expect(handler.on).toHaveBeenCalled();
      });
    });
  });
};
