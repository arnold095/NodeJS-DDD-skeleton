import { IocAdapter, useContainer, useKoaServer } from 'routing-controllers';
import * as Koa from 'koa';

export class KoaServer {
    private server: Koa;
    private serverPort: number;

    constructor(private container: IocAdapter) {
        this.server = new Koa();
        this.serverPort = parseInt(process.env.SERVER_AUTHENTICATION_PORT);
    }

    public load() {
        useContainer(this.container)
        const koaServer = useKoaServer(this.server, {
            routePrefix: '/api',
            controllers: [
                __dirname + '/../Controller/**/*.js',
            ]
        });
        koaServer.listen(this.serverPort);
        console.log(`Server running at port ${this.serverPort}`);
    }
}
