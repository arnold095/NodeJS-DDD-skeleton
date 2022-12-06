import { container } from '../DiConfig';
import { addHandlersToEventBus } from './AddHandlersToEventBus';
import { filesLoader } from './FilesLoader';
import { registerApplicationDependencies } from './RegisterApplicationDependencies';
import { registerInfrastructureDependencies } from './RegisterInfrastructureDependencies';

export const loadContainer = async (): Promise<void> => {
  await filesLoader();

  registerInfrastructureDependencies(container);
  registerApplicationDependencies(container);
  container.build();

  // It's necessary to load the handlers after the container is built
  addHandlersToEventBus(container);
};
