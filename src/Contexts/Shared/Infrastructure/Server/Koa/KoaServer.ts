import { useContainer, useKoaServer } from 'routing-controllers';
import * as Koa from 'koa';
import { inject, injectable } from 'inversify';
import { Logger } from '@/src/Contexts/Shared/Domain/Services/Logger';
import { WebServer } from '@/src/Contexts/Shared/Domain/Server/WebServer';
import { IocAdapter } from '@/src/Contexts/Shared/Domain/Server/IocAdapter';
import { RoutingControllersOptions } from 'routing-controllers/types/RoutingControllersOptions';

@injectable()
export class KoaServer implements WebServer {
  private readonly server: Koa;
  private readonly serverPort: number;

  constructor(@inject('Logger') private readonly logger: Logger) {
    this.server = new Koa();
    this.serverPort = parseInt(process.env.SERVER_AUTHENTICATION_PORT);
  }

  load(iocAdapter: IocAdapter, routeControllers?: string[]): void {
    useContainer(iocAdapter);
    const koaServer = useKoaServer(this.server, {
      routePrefix: '/api',
      controllers: routeControllers,
    });
    koaServer.listen(this.serverPort);
    this.logger.log(`Server running at port ${this.serverPort}`);
  }
}
