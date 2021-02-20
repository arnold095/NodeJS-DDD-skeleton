import { Container as InversifyContainer } from 'inversify';
import { Action, ClassConstructor, IocAdapter } from 'routing-controllers';
import { DummyContainer } from './Containers/DummyContainer';
export class InversifyAdapter implements IocAdapter {
    private container: InversifyContainer = new InversifyContainer();

    constructor() {
        this.inject(DummyContainer.container());
    }

    public get<T>(someClass: ClassConstructor<T>, action?: Action): T {
        return this.getClass(someClass.name);
    }

    public getClass<T>(className: string): T {
        return this.container.get(className);
    }

    private inject(dependencies) {
        const { controllers, services, repositories, buses } = dependencies;
        if (controllers) this.bindControllers(controllers);
        if (services) this.bindServices(services);
        if (repositories) this.bindRepositories(repositories);
        if (buses) this.bindBuses(buses);
    }

    private bindControllers(controllers) {
        for (const controller of controllers) {
            console.log(controller);
            this.container.bind(controller.name).to(controller).inRequestScope();
        }
    }

    private bindServices(services) {
        for (const service of services) {
            this.container.bind(service.name).to(service).inRequestScope();
        }
    }

    private bindRepositories(repositories) {
        for (const repository of repositories) {
            const { abstract, concrete } = repository;
            this.container.bind(abstract).to(concrete).inRequestScope();
        }
    }

    private bindBuses(buses) {
        for (const bus of buses) {
            const { abstract, concrete } = bus;
            this.container.bind(abstract).to(concrete).inSingletonScope();
        }
    }
}