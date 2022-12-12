import { MongoClient } from 'mongodb';

import { domainImplementations, EventBus } from '../../../../../Contexts/Shared/Domain';
import {
  controllers,
  InMemorySyncEventBus,
} from '../../../../../Contexts/Shared/Infrastructure';
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
    container.registerImplementation(controller.target);
  }
};

const registerDomainImplementation = (container: Container): void => {
  for (const repository of domainImplementations) {
    container.registerImplementationAs(repository.implementation, repository.abstraction);
  }
};

export const registerInfrastructureDependencies = (container: Container): void => {
  // Services
  registerServicesDependencies(container);

  // Controllers
  registerControllerDependencies(container);

  // Repositories
  registerDomainImplementation(container);
};
