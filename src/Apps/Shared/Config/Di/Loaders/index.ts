import { container } from '../DiConfig';
import { registerInfrastructureDependencies } from './RegisterInfrastructureDependencies';

export const LoadContainer = (): void => {
  registerInfrastructureDependencies(container);
  container.build();
};
