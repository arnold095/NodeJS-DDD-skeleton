import { Container as InversifyContainer } from 'inversify';
export class InversifyAdapter {
    private container: InversifyContainer;

    constructor() {

    }

    public get<T>(className: string): T {
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