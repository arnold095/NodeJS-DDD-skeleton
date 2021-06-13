import { useContainer, useKoaServer } from 'routing-controllers';
import * as Koa from 'koa';
import { inject, injectable } from 'inversify';
import { IocAdapter, Logger, WebServer } from '@sharedDomain';

@injectable()
export class KoaServer implements WebServer {
  private readonly server: Koa;

  constructor(@inject('Logger') private readonly logger: Logger) {
    this.server = new Koa();
  }

  load(iocAdapter: IocAdapter, port: number, routeControllers?: string[]): void {
    useContainer(iocAdapter);
    const koaServer = useKoaServer(this.server, {
      routePrefix: '/api',
      controllers: routeControllers,
    });
    koaServer.listen(port);
    this.logger.log(`Server running at port ${port}`);
  }
}
