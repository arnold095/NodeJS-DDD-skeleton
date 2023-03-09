import { EventBus, eventHandlers } from '../../../../../Contexts/Shared/Domain';
import { Container } from '../DiContainer';

export const addHandlersToEventBus = (container: Container): void => {
  // Add handlers to event bus
  const eventBus = container.get(EventBus);
  const handlers = [...eventHandlers].map(handler => container.get(handler));

  eventBus.addHandlers(handlers);
};
