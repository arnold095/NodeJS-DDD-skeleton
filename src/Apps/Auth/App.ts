import 'module-alias/register';
import * as map from 'source-map-support';
map.install()

import "reflect-metadata";
import "@/Contexts/Shared/Infrastructure/ApmClient";
import { InversifyAdapter } from "./DependencyContainer/InversifyAdapter";
import { KoaServer } from './Server/KoaServer';
import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";

export class App {
    private readonly server: KoaServer;
    private readonly container: InversifyAdapter;

    constructor() {
        this.container = new InversifyAdapter();
        this.server = new KoaServer(this.container);
    }

    public async bootStrap() {
        await this.connectToServices();
        this.server.load();
        this.loadEventBus();
    }

    private async connectToServices() {
    }

    private loadEventBus() {
        const eventBus = this.container.getClass<EventBus>('EventBus');
        eventBus.load();
    }
}

const app = new App();
app.bootStrap();
