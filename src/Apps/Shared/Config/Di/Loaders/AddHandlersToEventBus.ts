import { EventBus } from '../../../../../Contexts/Shared/Domain/Bus/EventBus';
import { EventHandler } from '../../../../../Contexts/Shared/Domain/Bus/EventHandler';
import { eventHandlers } from '../../../../../Contexts/Shared/Domain/Decorators/DomainEventHandlersDecorator';
import { Class } from '../../../../../Contexts/Shared/Domain/Utils/Class';
import { Container } from '../Container';

export const addHandlersToEventBus = (container: Container): void => {
  // Add handlers to event bus
  const eventBus = container.get(EventBus);
  const handlers = [...eventHandlers].map((handler: Class<EventHandler>) =>
    container.get(handler),
  );

  eventBus.addHandlers(handlers);
};
