import { Newable } from 'diod';
import { MongoClient } from 'mongodb';

import { EventBus } from '../../../../../Contexts/Shared/Domain/Bus/EventBus';
import { repositories } from '../../../../../Contexts/Shared/Domain/Decorators/RepositoryDecorator';
import { InMemorySyncEventBus } from '../../../../../Contexts/Shared/Infrastructure/Bus/InMemorySyncEventBus';
import { controllers } from '../../../../../Contexts/Shared/Infrastructure/Decorators/ControllerDecorator';
import { BaseController } from '../../../Controllers/BaseController';
import { env } from '../../env';
import { SessionMongoDbClient } from '../../MongoDbConfig';
import { Container, DependencyScope } from '../Container';

const registerServicesDependencies = (container: Container): void => {
  // Event bus
  container.registerImplementationAs(
    InMemorySyncEventBus,
    EventBus,
    DependencyScope.Singleton,
  );

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
    container.registerImplementationAs(repository.target, repository.abstraction);
  }
};

export const registerInfrastructureDependencies = (container: Container): void => {
  // Services
  registerServicesDependencies(container);

  // Controllers
  registerControllerDependencies(container);

  // Repositories
  registerRepositories(container);
};
