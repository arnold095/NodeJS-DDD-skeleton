import { Server } from 'http';
import { Logger } from '@sharedDomain';
import Koa from 'koa';
import cors from '@koa/cors';
import { ErrorHandler } from './Middleware/ErrorHandler';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';

export class KoaWebServer {
  private readonly koaServer: Koa;
  private _httpServer!: Server;
  constructor(private logger: Logger) {
    this.koaServer = new Koa();
  }

  async load(port: number, router: Router.Middleware): Promise<void> {
    this.loadErrorHandler();
    this.koaServer.use(
      cors({
        credentials: true,
        origin: process.env.SERVER_ALLOWED_ORIGIN,
      })
    );
    this.koaServer.use(bodyParser());
    this.koaServer.use(router);
    this.koaServer.on('error', (err) => {
      this.logger.info('Server error', err);
    });
    this._httpServer = this.koaServer.listen(port);
    this.logger.log(`Server running at port ${port}`);
  }

  private loadErrorHandler(): void {
    this.koaServer.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        const errorHandler = new ErrorHandler();
        errorHandler.run(ctx, err as Error);
      }
    });
  }

  public close(): void {
    this._httpServer.close();
  }

  public httpServer(): Server {
    return this._httpServer;
  }
}
