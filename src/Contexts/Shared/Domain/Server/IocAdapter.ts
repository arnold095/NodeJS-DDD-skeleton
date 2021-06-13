import { ClassConstructor } from '@/src/Contexts/Shared/Domain/Utils/GenericTypes';

export interface IocAdapter {
  container(): unknown;
  getClass<T>(className: string): T;
  get<T>(someClass: ClassConstructor<T>): T;
}
