import * as map from 'source-map-support';
import 'reflect-metadata';
import { InversifyAdapter } from "../../../../../src/Apps/MyApp/DependencyContainer/InversifyAdapter";
import { RedisConnection } from "../../../../../src/Contexts/Shared/Infrastructure/Persistence/Redis/RedisConnection";
map.install();

export class Arranger {
    public static _container: InversifyAdapter;

    public static async run() {
        await this.loadContainer();
        await this.loadServices();
    }

    public static get container() {
        return this._container;
    }

    private static async loadContainer() {
        this._container = new InversifyAdapter();
    }

    private static async loadServices() {
        await RedisConnection.connect();
    }
}
