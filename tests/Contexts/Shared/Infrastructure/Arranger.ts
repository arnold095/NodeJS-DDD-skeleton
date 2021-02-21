import * as map from 'source-map-support';
import 'reflect-metadata';
map.install();

import { RedisConnection } from "../../../../src/Contexts/Shared/Infrastructure/Persistence/Redis/RedisConnection";
import { InversifyAdapter } from "../../../../src/Apps/MyApp/DependencyContainer/InversifyAdapter";

export class Arranger {
    public static _container: InversifyAdapter;

    public static async run() {
        this.loadEnvironmentVars();
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

    // TODO: TEMP.
    private static loadEnvironmentVars(){
        process.env.mode="DEV";
        process.env.SERVERPORT="3000";
        process.env.REDIS_TTL="3600000";
        process.env.REDIS_PORT="6379";
        process.env.REDIS_HOST="localhost";
        process.env.REDIS_DEFAULT_DB="0";
        process.env.MAIL_WELCOME_DUMMY="test@test.test";
        process.env.NODE_MAILER_HOST="smtp.ethereal.email";
        process.env.NODE_MAILER_PORT="587";
        process.env.NODE_MAILER_SECURE="false";
    }
}
