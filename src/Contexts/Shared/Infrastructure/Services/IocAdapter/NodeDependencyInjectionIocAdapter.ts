import { IocAdapter } from '@sharedDomain';
import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

export class NodeDependencyInjectionIocAdapter implements IocAdapter {
  private readonly _container: ContainerBuilder;

  constructor(routerFile: string) {
    this._container = new ContainerBuilder();
    const loader = new YamlFileLoader(this._container);
    loader.load(routerFile);
  }

  get container(): ContainerBuilder {
    return this._container;
  }

  get<T>(className: string): T {
    return this._container.get<T>(className);
  }
}
