import { IocAdapter } from '@sharedDomain';

export interface WebServer {
  load(iocAdapter: IocAdapter, port: number, routeControllers?: string[]): void;
}
