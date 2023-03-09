import { domainImplementations, EventBus } from '../../../../../Contexts/Shared/Domain';
import {
  controllers,
  InMemorySyncEventBus,
} from '../../../../../Contexts/Shared/Infrastructure';
import { Container } from '../DiContainer';

const registerBuses = (container: Container): void => {
  // Event bus
  container.register(EventBus).use(InMemorySyncEventBus).asSingleton();
};

const registerControllerDependencies = (container: Container): void => {
  for (const controller of controllers) {
    container.register(controller.target).use(controller.target);
  }
};

const registerDomainImplementation = (container: Container): void => {
  for (const domainImplementation of domainImplementations) {
    container.register(domainImplementation.abstraction).use(domainImplementation.target);
  }
};

export const registerInfrastructureDependencies = (container: Container): void => {
  // Buses
  registerBuses(container);

  // Controllers
  registerControllerDependencies(container);

  // Repositories
  registerDomainImplementation(container);
};
