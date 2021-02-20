import { useContainer, useKoaServer, IocAdapter } from 'routing-controllers';
import * as Koa from 'koa';
import { DummyPostController } from '../Controller/Dummy/Post/DummyPostController';

export class KoaServer {
    private server: Koa;
    private serverPort: number;

    constructor(private container: IocAdapter) {
        this.server = new Koa();
        this.serverPort = parseInt(process.env.SERVERPORT);
    }

    public load() {
        useContainer(this.container)
        const koaServer = useKoaServer(this.server, {
            routePrefix: '/api',
            controllers: [DummyPostController]
        });
        koaServer.listen(this.serverPort);
        console.log(`Server running at port ${this.serverPort}`);
    }
}