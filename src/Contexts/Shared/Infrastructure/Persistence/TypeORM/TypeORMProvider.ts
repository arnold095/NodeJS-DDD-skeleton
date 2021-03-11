import { ConnectionNotFoundError, createConnection, getConnection } from 'typeorm';
import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";
import { Connection } from "typeorm/connection/Connection";
import { injectable } from "inversify";
import { DummyEntity } from "@/Contexts/Shared/Infrastructure/Persistence/TypeORM/Entities/DummyEntity";

@injectable()
export class TypeORMProvider {
    private connectionParams: ConnectionOptions;
    private _connection: Connection;

    public async connect() {
        this.loadConfiguration();
        this._connection = await createConnection(this.connectionParams);
    }

    private loadConfiguration() {
        this.connectionParams = {
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DATABASE,
            port: parseInt(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            entities: [
                DummyEntity
            ],
            synchronize: false,
            logging: false,
        };
    }

    public connection(connectionName?: string): Connection {
        return getConnection(connectionName);
    }

    public async close(connectionName?: string): Promise<void> {
        await this.connection(connectionName).close();
    }

    public async checkConnection(connectionName?: string): Promise<void> {
        try {
            this.connection(connectionName);
        } catch (e) {
            if (e instanceof ConnectionNotFoundError) {
                await this.connect();
            } else {
                throw e;
            }
        }
    }
}
