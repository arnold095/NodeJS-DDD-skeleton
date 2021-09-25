import 'reflect-metadata';
import * as map from 'source-map-support';
import { RouterBuilder } from 'decorator-koa-router';
import { join } from 'path';
import { KoaWebServer, NodeDependencyInjectionIocAdapter } from '@sharedInfra';
map.install();

export class App {
  private readonly serverPort = parseInt(process.env.SERVER_PORT ?? '3000');

  private readonly server: KoaWebServer;
  private iocAdapter = new NodeDependencyInjectionIocAdapter(
    join(__dirname, './DependencyContainer/Container.yaml')
  );

  constructor() {
    this.server = this.iocAdapter.get('Shared.WebServer');
  }

  public async bootStrap(): Promise<void> {
    const router = await RouterBuilder('/api', this.iocAdapter, './Controller/*.ts');
    await this.server.load(this.serverPort, router);
  }
}

const app = new App();
app.bootStrap();
