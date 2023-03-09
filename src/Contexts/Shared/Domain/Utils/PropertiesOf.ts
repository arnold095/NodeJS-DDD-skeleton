/* eslint-disable @typescript-eslint/ban-types */

type Methods<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type MethodsAndProperties<T> = { [key in keyof T]: T[key] };

export type PropertiesOf<T> = Omit<MethodsAndProperties<T>, Methods<T>>;
