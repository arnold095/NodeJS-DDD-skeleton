import {
  Class,
  EventBus,
  EventHandler,
  eventHandlers,
} from '../../../../../Contexts/Shared/Domain';
import { Container } from '../Container';

export const addHandlersToEventBus = (container: Container): void => {
  // Add handlers to event bus
  const eventBus = container.get(EventBus);
  const handlers = [...eventHandlers].map((handler: Class<EventHandler>) =>
    container.get(handler),
  );

  eventBus.addHandlers(handlers);
};
