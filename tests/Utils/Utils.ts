import { container } from '../../src/Apps/Shared';
import { registerInfrastructureServices } from '../../src/Apps/Shared/Config/Di/Loaders/RegisterInfrastructureServices';

export const registerInfrastructureDependencies = (): void => {
  registerInfrastructureServices(container);
  container.build();
};
