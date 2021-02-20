import 'module-alias/register';
import * as map from 'source-map-support';
map.install();

import "reflect-metadata";
import { InversifyAdapter } from "./DependencyContainer/InversifyAdapter";
import { KoaServer } from './Server/KoaServer';

export class App {
    private readonly server: KoaServer;

    constructor() {
        const container = new InversifyAdapter();
        this.server = new KoaServer(container);
    }

    public async bootStrap() {
        await this.connectToServices();
        this.server.load();
    }

    private async connectToServices() {

    }
}
const app = new App();
app.bootStrap();