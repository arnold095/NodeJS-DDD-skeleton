import { useContainer, useKoaServer } from 'routing-controllers';
import Koa from 'koa';
import { inject, injectable } from 'inversify';
import { IocAdapter, Logger, WebServer } from '@sharedDomain';
import { ErrorHandler } from './Middleware/ErrorHandler';
import { Server } from 'http';
import cors from '@koa/cors';

@injectable()
export class KoaServer implements WebServer {
  private readonly koaServer: Koa;
  private _httpServer!: Server;

  constructor(
    @inject('Logger') private readonly logger: Logger,
    @inject('ErrorHandler') private readonly errorHandler: ErrorHandler
  ) {
    this.koaServer = new Koa();
  }

  load(iocAdapter: IocAdapter, port: number, routeControllers?: string[]): void {
    this.koaServer.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        this.errorHandler.run(ctx, err);
      }
    });
    this.koaServer.use(cors());
    this.koaServer.on('error', (err) => {
      this.logger.info('Server error', err);
    });
    useContainer(iocAdapter);
    const koaServer = useKoaServer(this.koaServer, {
      routePrefix: '/api',
      controllers: routeControllers,
      defaultErrorHandler: false,
    });
    this._httpServer = koaServer.listen(port);
    this.logger.log(`Server running at port ${port}`);
  }

  public close(): void {
    this._httpServer.close();
  }

  public httpServer(): Server {
    return this._httpServer;
  }
}
