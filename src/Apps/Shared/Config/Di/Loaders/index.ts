import { container } from '../DiConfig';
import { registerInfrastructureDependencies } from './RegisterInfrastructureDependencies';
import { registerApplicationDependencies } from './RegisterApplicationDependencies';

export const LoadContainer = (): void => {
  registerInfrastructureDependencies(container);
  registerApplicationDependencies(container);
  container.build();
};
