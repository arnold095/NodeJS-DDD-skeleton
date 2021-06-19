import { useContainer, useKoaServer } from 'routing-controllers';
import Koa from 'koa';
import { inject, injectable } from 'inversify';
import { IocAdapter, Logger, WebServer } from '@sharedDomain';
import { ErrorHandler } from './Middleware/ErrorHandler';

@injectable()
export class KoaServer implements WebServer {
  private readonly server: Koa;

  constructor(
    @inject('Logger') private readonly logger: Logger,
    @inject('ErrorHandler') private readonly errorHandler: ErrorHandler
  ) {
    this.server = new Koa();
  }

  load(iocAdapter: IocAdapter, port: number, routeControllers?: string[]): void {
    this.server.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        this.errorHandler.run(ctx, err);
      }
    });
    this.server.on('error', (err) => {
      this.logger.info('Server error', err);
    });
    useContainer(iocAdapter);
    const koaServer = useKoaServer(this.server, {
      routePrefix: '/api',
      controllers: routeControllers,
      defaultErrorHandler: false,
    });
    koaServer.listen(port);
    this.logger.log(`Server running at port ${port}`);
  }
}
