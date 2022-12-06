import { Container } from '../Container';
import { EventBus } from '../../../../../Contexts/Shared/Domain/Bus/EventBus';
import { EventHandler } from '../../../../../Contexts/Shared/Domain/Bus/EventHandler';
import { Class } from '../../../../../Contexts/Shared/Domain/Utils/Class';
import { eventHandlers } from '../../../../../Contexts/Shared/Domain/Decorators/DomainEventHandlersDecorator';

export const addHandlersToEventBus = (container: Container): void => {
  // Add handlers to event bus
  const eventBus = container.get(EventBus);
  const handlers = [...eventHandlers].map((handler: Class<EventHandler>) =>
    container.get(handler),
  );

  eventBus.addHandlers(handlers);
};
