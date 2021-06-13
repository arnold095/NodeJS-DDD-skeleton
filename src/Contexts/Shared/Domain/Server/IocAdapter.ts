import { ClassConstructor } from '@sharedDomain';

export interface IocAdapter {
  container(): unknown;
  getClass<T>(className: string): T;
  get<T>(someClass: ClassConstructor<T>): T;
}
