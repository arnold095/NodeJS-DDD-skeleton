import { IocAdapter } from '@sharedDomain';
import { Server } from 'http';

export interface WebServer {
  load(iocAdapter: IocAdapter, port: number, routeControllers?: string[]): void;
  close(): void;
  httpServer(): Server;
}
