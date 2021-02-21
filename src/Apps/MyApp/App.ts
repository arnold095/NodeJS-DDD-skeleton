import 'module-alias/register';
import * as map from 'source-map-support';
map.install();

import "reflect-metadata";
import { InversifyAdapter } from "./DependencyContainer/InversifyAdapter";
import { KoaServer } from './Server/KoaServer';
import { RedisConnection } from '@/Contexts/Shared/Infrastructure/Persistence/Redis/RedisConnection';
import { DomainEventSubscribers } from './DomainEventSubscribers';

export class App {
    private readonly server: KoaServer;
    private readonly domainEventSubscribers: DomainEventSubscribers;

    constructor() {
        const container = new InversifyAdapter();
        this.server = new KoaServer(container);
        this.domainEventSubscribers = new DomainEventSubscribers(container);
    }

    public async bootStrap() {
        await this.connectToServices();
        this.server.load();
        this.domainEventSubscribers.load();
    }

    private async connectToServices() {
        await RedisConnection.connect();
    }
}
const app = new App();
app.bootStrap();