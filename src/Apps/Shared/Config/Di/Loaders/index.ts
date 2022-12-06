import { container } from '../DiConfig';
import { registerInfrastructureDependencies } from './RegisterInfrastructureDependencies';
import { registerApplicationDependencies } from './RegisterApplicationDependencies';
import { filesLoader } from './FilesLoader';
import { addHandlersToEventBus } from './AddHandlersToEventBus';

export const loadContainer = async (): Promise<void> => {
  await filesLoader();

  registerInfrastructureDependencies(container);
  registerApplicationDependencies(container);
  container.build();

  // It's necessary to load the handlers after the container is built
  addHandlersToEventBus(container);
};
