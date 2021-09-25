export interface IocAdapter {
  get<T>(className: string): T;
}
