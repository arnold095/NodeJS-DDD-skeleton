import 'module-alias/register';
import * as map from 'source-map-support';

import 'reflect-metadata';
import '@/src/Contexts/Shared/Infrastructure/ApmClient';
import { InversifyAdapter } from './DependencyContainer/InversifyAdapter';
import { EventBus } from '@/src/Contexts/Shared/Domain/Bus/Event/EventBus';
import { WebServer } from '@/src/Contexts/Shared/Domain/Server/WebServer';
import { KoaServer } from '@/src/Contexts/Shared/Infrastructure/Server/Koa/KoaServer';
import { join } from 'path';
map.install();

export class App {
  private readonly server: WebServer;
  private readonly iocAdapter = new InversifyAdapter();

  constructor() {
    this.server = this.iocAdapter.get(KoaServer);
  }

  public async bootStrap(): Promise<void> {
    this.server.load(this.iocAdapter, this.controllers());
    this.loadEventBus();
  }

  private loadEventBus() {
    const eventBus = this.iocAdapter.getClass<EventBus>('EventBus');
    eventBus.load();
  }

  private controllers(): string[] {
    return [join(__dirname, '/Controller/**/*.js')];
  }
}

const app = new App();
app.bootStrap();
