import { IocAdapter } from '@sharedDomain';

export interface WebServer {
  load(iocAdapter: IocAdapter, routeControllers?: string[]): void;
}
