import {
  Class,
  EventHandler,
  eventHandlers,
  NewableClass,
  useCases,
} from '../../../../../Contexts/Shared/Domain';
import { Container } from '../DiContainer';

const registerUseCases = (container: Container): void => {
  for (const useCase of useCases) {
    container.register(useCase).use(useCase as NewableClass<unknown>);
  }
};

const registerEventHandlers = (container: Container): void => {
  for (const handler of eventHandlers) {
    container
      .register(handler as Class<EventHandler>)
      .use(handler as NewableClass<EventHandler>);
  }
};

export const registerApplicationDependencies = (container: Container): void => {
  registerUseCases(container);
  registerEventHandlers(container);
};
