import { Container, DependencyScope } from '../Container';
import { registerServicesDependencies } from './RegisterServicesDependencies';
import { InMemorySyncEventBus } from '../../../../../Contexts/Shared/Infrastructure/Bus/InMemorySyncEventBus';
import { EventBus } from '../../../../../Contexts/Shared/Domain/Bus/EventBus';
import { registerControllerDependencies } from './RegisterControllerDependencies';

export const registerInfrastructureDependencies = (container: Container): void => {
  // Event bus
  container.registerImplementationAs(
    InMemorySyncEventBus,
    EventBus,
    DependencyScope.Singleton,
  );

  // Services
  registerServicesDependencies(container);

  // Controllers
  registerControllerDependencies(container);
};
