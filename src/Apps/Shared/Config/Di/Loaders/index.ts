import { container } from '../DiContainer';
import { addHandlersToEventBus } from './AddHandlersToEventBus';
import { filesLoader } from './FilesLoader';
import { registerApplicationDependencies } from './RegisterApplicationDependencies';
import { registerInfrastructureDependencies } from './RegisterInfrastructureDependencies';
import { registerInfrastructureServices } from './RegisterInfrastructureServices';

export const loadContainer = async (): Promise<void> => {
  await filesLoader();

  registerInfrastructureDependencies(container);
  registerInfrastructureServices(container);
  registerApplicationDependencies(container);
  container.build();

  // It's necessary to load the handlers after the container is built
  addHandlersToEventBus(container);
};
