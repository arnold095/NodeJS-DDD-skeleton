import 'module-alias/register';
import * as map from 'source-map-support';
import 'reflect-metadata';
import { InversifyAdapter } from './DependencyContainer/InversifyAdapter';
import { join } from 'path';
import { EventBus, WebServer } from '@sharedDomain';
import { ApmClient } from '@sharedInfra';
map.install();

export class App {
  private readonly server: WebServer;
  private readonly iocAdapter = new InversifyAdapter();
  private readonly serverPort = parseInt(process.env.SERVER_AUTHENTICATION_PORT);

  constructor() {
    this.server = this.iocAdapter.getClass('WebServer');
  }

  public async bootStrap(): Promise<void> {
    this.server.load(this.iocAdapter, this.serverPort, this.controllers());
    this.loadEventBus();
    ApmClient.connect();
  }

  private loadEventBus() {
    const eventBus = this.iocAdapter.getClass<EventBus>('EventBus');
    eventBus.load();
  }

  private controllers(): string[] {
    return [join(__dirname, '/Controller/**/*.ts')];
  }
}

const app = new App();
app.bootStrap();
