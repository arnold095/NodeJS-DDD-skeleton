import {
  Container as DiodContainer,
  ContainerBuilder as DiodContainerBuilder,
  Registration,
} from 'diod';

import { Class, NewableClass } from '../../../../Contexts/Shared/Domain';

export type Identifier<T> = Class<T> | NewableClass<T>;

export class Container {
  public builder = new DiodContainerBuilder();
  public container!: DiodContainer;
  public get<T>(identifier: Identifier<T>): T {
    return this.container.get<T>(identifier);
  }

  public register<T>(service: Identifier<T>): Registration<T> {
    return this.builder.register<T>(service);
  }

  public build(): void {
    this.container = this.builder.build();
  }
}

export const container = new Container();
