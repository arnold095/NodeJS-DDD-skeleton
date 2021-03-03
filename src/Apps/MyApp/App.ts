import 'module-alias/register';
import * as map from 'source-map-support';
import "reflect-metadata";
import { InversifyAdapter } from "./DependencyContainer/InversifyAdapter";
import { KoaServer } from './Server/KoaServer';
import { RedisConnection } from '@/Contexts/Shared/Infrastructure/Persistence/Redis/RedisConnection';
import { EventBus } from "@/Contexts/Shared/Domain/Bus/Event/EventBus";

map.install();

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
        await RedisConnection.connect();
    }

    private loadEventBus() {
        const eventBus = this.container.getClass<EventBus>('EventBus');
        eventBus.load();
    }
}

const app = new App();
app.bootStrap();
