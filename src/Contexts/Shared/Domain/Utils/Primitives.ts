// This utility has been extracted from Codely repository

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-use-before-define */

type Methods<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type MethodsAndProperties<T> = { [key in keyof T]: T[key] };

type Properties<T> = Omit<MethodsAndProperties<T>, Methods<T>>;

type PrimitiveTypes = boolean | number | string | Date;

type ValueObjectValue<T> = {
  [key in keyof T]: T[key] extends PrimitiveTypes
    ? T[key]
    : T[key] extends { value: unknown }
    ? Pick<T[key], 'value'>['value']
    : T[key] extends Array<{ value: unknown }>
    ? Pick<T[key][number], 'value'>['value'][]
    : T[key] extends Array<Object>
    ? Primitives<T[key][number]>[]
    : T[key] extends Object
    ? Primitives<T[key]>
    : T[key];
};

export type Primitives<T> = ValueObjectValue<Properties<T>>;
