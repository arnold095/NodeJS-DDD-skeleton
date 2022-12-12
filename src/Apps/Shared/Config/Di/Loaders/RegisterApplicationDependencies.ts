import {
  EventHandler,
  eventHandlers,
  NewableClass,
  useCases,
} from '../../../../../Contexts/Shared/Domain';
import { Container } from '../Container';

const registerUseCases = (container: Container): void => {
  for (const useCase of useCases) {
    container.registerImplementation(useCase as NewableClass<unknown>);
  }
};

const registerEventHandlers = (container: Container): void => {
  for (const handler of eventHandlers) {
    container.registerImplementation(handler as NewableClass<EventHandler>);
  }
};

export const registerApplicationDependencies = (container: Container): void => {
  registerUseCases(container);
  registerEventHandlers(container);
};
