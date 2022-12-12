import {
  Abstract,
  Container as DiodContainer,
  ContainerBuilder,
  Instance,
  WithScopeChange,
} from 'diod';

import { Class, NewableClass } from '../../../../Contexts/Shared/Domain';

export enum DependencyScope {
  Transient = 'Transient',
  Singleton = 'Singleton',
  Request = 'Request',
}

export type ServiceIdentifier<T> = Class<T> | NewableClass<T>;

export class Container {
  private readonly builder = new ContainerBuilder();
  private container!: DiodContainer;

  public get<T>(dependency: ServiceIdentifier<T>): T {
    if (!this.container) {
      throw new Error('Must build container first');
    }

    return this.container.get(dependency) as T;
  }

  public registerImplementationAs<A, I extends A>(
    implementation: NewableClass<I>,
    abstraction: Abstract<A>,
    scope: DependencyScope = DependencyScope.Transient,
  ): void {
    const registration = this.builder.register(abstraction).use(implementation);
    Container.setScope(registration, scope);
  }

  public registerImplementation<T>(
    implementation: NewableClass<T>,
    scope: DependencyScope = DependencyScope.Transient,
  ): void {
    const registration = this.builder.register(implementation).use(implementation);
    Container.setScope(registration, scope);
  }

  public registerFactoryAs<A, I extends A>(
    value: (c: Container) => Instance<I>,
    abstraction: Abstract<A>,
    scope: DependencyScope = DependencyScope.Transient,
  ): void {
    const registration = this.builder.register(abstraction).useFactory(() => {
      return value(this);
    });
    Container.setScope(registration, scope);
  }

  public build(): void {
    this.container = this.builder.build();
  }

  private static setScope(registration: WithScopeChange, scope: DependencyScope): void {
    if (scope === DependencyScope.Singleton) {
      registration.asSingleton();
    } else if (scope === DependencyScope.Request) {
      registration.asInstancePerRequest();
    }
  }
}
