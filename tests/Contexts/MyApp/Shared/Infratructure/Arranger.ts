import 'reflect-metadata';
import * as map from 'source-map-support';
import { ContainerBuilder } from 'node-dependency-injection';
import { join } from 'path';
import { NodeDependencyInjectionIocAdapter } from '@sharedInfra';
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
      join(__dirname, '../../../../../src/Apps/MyApp/DependencyContainer/Container.yaml')
    ).container;
  }
}
