import { Container } from 'inversify';
import { ClassConstructor, IocAdapter as RoutingIocAdapter } from 'routing-controllers';
import { SharedContainer } from './Containers/SharedContainer';
import { IocAdapter } from '@/src/Contexts/Shared/Domain/Server/IocAdapter';
import { AdapterTypes } from '@/src/Contexts/Shared/Domain/Server/AdapterTypes';
import { NotificationsContainer } from '@/src/Apps/Notifications/DependencyContainer/Containers/NotificationsContainer';

export class InversifyAdapter implements IocAdapter, RoutingIocAdapter {
  private _container: Container = new Container();

  constructor() {
    this.inject(NotificationsContainer.container());
    this.inject(SharedContainer.container());
  }

  public container(): Container {
    return this._container;
  }

  public get<T>(someClass: ClassConstructor<T>): T {
    return this.getClass(someClass.name);
  }

  public getClass<T>(className: string): T {
    return this._container.get(className);
  }

  private inject(dependencies: AdapterTypes) {
    const { controllers, services, domainContracts, domainEventSubscribers } =
      dependencies;
    if (controllers) this.bindControllers(controllers);
    if (services) this.bindServices(services);
    if (domainContracts) this.bindDomainContracts(domainContracts);
    if (domainEventSubscribers) this.bindDomainEventSubscribers(domainEventSubscribers);
  }

  private bindControllers(controllers) {
    for (const controller of controllers) {
      this.container.bind(controller.name).to(controller).inRequestScope();
    }
  }

  private bindServices(services) {
    for (const service of services) {
      this.container.bind(service.name).to(service).inRequestScope();
    }
  }

  private bindDomainContracts(repositories) {
    for (const repository of repositories) {
      const { abstract, concrete } = repository;
      this.container.bind(abstract).to(concrete).inRequestScope();
    }
  }

  private bindDomainEventSubscribers(subscribers) {
    for (const subscriber of subscribers) {
      this.container.bind('DomainEventSubscriber').to(subscriber);
    }
  }
}
