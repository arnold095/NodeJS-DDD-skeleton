import * as map from 'source-map-support';
import 'reflect-metadata';
import { NodeDependencyInjectionIocAdapter } from '@sharedInfra';
import { join } from 'path';
import { ContainerBuilder } from 'node-dependency-injection';
map.install();

export class Arranger {
  public static _container: ContainerBuilder;

  public static async run(): Promise<void> {
    await this.loadContainer();
  }

  public static get container(): ContainerBuilder {
    return this._container;
  }

  private static async loadContainer(): Promise<void> {
    this._container = new NodeDependencyInjectionIocAdapter(
      join(__dirname, '../../../../src/Apps/Auth/DependencyContainer/Container.yaml')
    ).container;
  }
}
