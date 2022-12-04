import {
  Abstract,
  Container as DiodContainer,
  ContainerBuilder,
  Instance,
  Newable,
  WithScopeChange,
} from 'diod';
import { NewableClass } from '../../../../Contexts/Shared/Domain/Utils/NewableClass';
import { Class } from '../../../../Contexts/Shared/Domain/Utils/Class';

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

  public registerImplementationAs<T extends A, A>(
    implementation: Newable<T>,
    abstraction: Abstract<A>,
    scope: DependencyScope = DependencyScope.Transient,
  ): void {
    const registration = this.builder.register(abstraction).use(implementation);
    Container.setScope(registration, scope);
  }

  public registerImplementation<T>(
    implementation: Newable<T>,
    scope: DependencyScope = DependencyScope.Transient,
  ): void {
    const registration = this.builder.register(implementation).use(implementation);
    Container.setScope(registration, scope);
  }

  public registerFactoryAs<T extends A, A>(
    value: (c: Container) => Instance<T>,
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
