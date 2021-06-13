import 'reflect-metadata';
import * as map from 'source-map-support';
import { InversifyAdapter } from '../../../../../src/Apps/MyApp/DependencyContainer/InversifyAdapter';
map.install();

export class Arranger {
  public static _container: InversifyAdapter;

  public static async run(): Promise<void> {
    await this.loadContainer();
  }

  public static get container(): InversifyAdapter {
    return this._container;
  }

  private static async loadContainer(): Promise<void> {
    this._container = new InversifyAdapter();
  }
}
