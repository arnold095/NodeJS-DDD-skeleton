import { Container as InversifyContainer } from 'inversify';
import { Action, ClassConstructor, IocAdapter } from 'routing-controllers';
import { SharedContainer } from './Containers/SharedContainer';
import { DomainEventSubscriber } from "@/Contexts/Shared/Domain/Bus/Event/DomainEventSubscriber";
import { UserAuthContainer } from "@/Apps/Auth/DependencyContainer/Containers/UserAuthContainer";

export class InversifyAdapter implements IocAdapter {
    private container: InversifyContainer = new InversifyContainer();

    constructor() {
        this.inject(UserAuthContainer.container());
        this.inject(SharedContainer.container());
    }

    public get<T>(someClass: ClassConstructor<T>, action?: Action): T {
        return this.getClass(someClass.name);
    }

    public getClass<T>(className: string): T {
        return this.container.get(className);
    }

    public getAll<T>(abstraction: string): any[] {
        return this.container.getAll(abstraction);
    }

    private inject(dependencies) {
        const {
            controllers, services, repositories,
            buses, domainEventSubscribers,
        } = dependencies;
        if (controllers) this.bindControllers(controllers);
        if (services) this.bindServices(services);
        if (repositories) this.bindRepositories(repositories);
        if (buses) this.bindBuses(buses);
        if (domainEventSubscribers) this.bindDomainEventSubscribers(domainEventSubscribers);
    }

    private bindControllers(controllers) {
        for ( const controller of controllers ) {
            this.container.bind(controller.name).to(controller).inRequestScope();
        }
    }

    private bindServices(services) {
        for ( const service of services ) {
            this.container.bind(service.name).to(service).inRequestScope();
        }
    }

    private bindRepositories(repositories) {
        for ( const repository of repositories ) {
            const {abstract, concrete} = repository;
            this.container.bind(abstract).to(concrete).inRequestScope();
        }
    }

    private bindBuses(buses) {
        for ( const bus of buses ) {
            const {abstract, concrete} = bus;
            this.container.bind(abstract).to(concrete).inSingletonScope();
        }
    }

    private bindDomainEventSubscribers(subscribers) {
        for ( const subscriber of subscribers ) {
            this.container.bind('DomainEventSubscriber').to(subscriber);
        }
    }
}
