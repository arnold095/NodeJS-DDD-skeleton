import { Container } from '../Container';
import { useCases } from '../../../../../Contexts/Shared/Domain/Decorators/UseCaseDecorator';
import { eventHandlers } from '../../../../../Contexts/Shared/Domain/Decorators/DomainEventHandlersDecorator';
import { NewableClass } from '../../../../../Contexts/Shared/Domain/Utils/NewableClass';
import { EventHandler } from '../../../../../Contexts/Shared/Domain/Bus/EventHandler';

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
