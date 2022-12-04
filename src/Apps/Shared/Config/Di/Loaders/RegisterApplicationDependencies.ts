import { Container } from '../Container';
import { Newable } from 'diod';
import { useCases } from '../../../../../Contexts/Shared/Domain/Decorators/UseCaseDecorator';

export const registerApplicationDependencies = (container: Container): void => {
  for (const useCase of useCases) {
    container.registerImplementation(useCase.target as Newable<unknown>);
  }
};
