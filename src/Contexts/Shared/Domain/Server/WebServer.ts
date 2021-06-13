import { IocAdapter } from './IocAdapter';

export interface WebServer {
  load(iocAdapter: IocAdapter, routeControllers?: string[]): void;
}
