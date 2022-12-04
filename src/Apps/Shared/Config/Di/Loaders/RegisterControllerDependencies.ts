import { Container } from '../Container';
import { controllers } from '../../../../../Contexts/Shared/Infrastructure/Decorators/ControllerDecorator';
import { Newable } from 'diod';
import { BaseController } from '../../../Controllers/BaseController';

export const registerControllerDependencies = (container: Container): void => {
  for (const controller of controllers) {
    container.registerImplementation(controller.target as Newable<BaseController>);
  }
};
