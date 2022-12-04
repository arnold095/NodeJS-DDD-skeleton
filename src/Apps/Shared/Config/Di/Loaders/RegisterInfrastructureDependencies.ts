import { Container, DependencyScope } from '../Container';
import { InMemorySyncEventBus } from '../../../../../Contexts/Shared/Infrastructure/Bus/InMemorySyncEventBus';
import { EventBus } from '../../../../../Contexts/Shared/Domain/Bus/EventBus';
import { repositories } from '../../../../../Contexts/Shared/Domain/Decorators/RepositoryDecorator';
import { NewableClass } from '../../../../../Contexts/Shared/Domain/Utils/NewableClass';
import { controllers } from '../../../../../Contexts/Shared/Infrastructure/Decorators/ControllerDecorator';
import { Newable } from 'diod';
import { BaseController } from '../../../Controllers/BaseController';
import { MongoClient } from 'mongodb';
import { env } from '../../env';
import { SessionMongoDbClient } from '../../MongoDbConfig';

export const registerServicesDependencies = (container: Container): void => {
  // Mongo
  container.registerFactoryAs(
    () => {
      return new MongoClient(env.mongo.mongoUri, {
        loggerLevel: 'debug',
      });
    },
    SessionMongoDbClient,
    DependencyScope.Singleton,
  );
};
const registerControllerDependencies = (container: Container): void => {
  for (const controller of controllers) {
    container.registerImplementation(controller.target as Newable<BaseController>);
  }
};

const registerRepositories = (container: Container): void => {
  for (const repository of repositories) {
    container.registerImplementationAs(
      repository.target as NewableClass<unknown>,
      repository.abstraction,
    );
  }
};
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

  // Repositories
  registerRepositories(container);
};
