import { PropertiesOf } from './PropertiesOf';

type PrimitiveTypes = string | number | boolean | Date | undefined | null;

type ValueObjectValue<T> = T extends PrimitiveTypes
  ? T
  : T extends { value: infer U }
    ? U
    : T extends Array<{ value: infer U }>
      ? U[]
      : T extends Array<infer U>
        ? Array<ValueObjectValue<U>>
        : T extends { [K in keyof PropertiesOf<T>]: unknown }
          ? { [K in keyof PropertiesOf<T>]: ValueObjectValue<PropertiesOf<T>[K]> }
          : T extends unknown
            ? unknown
            : never;

export type Primitives<T> = {
  [key in keyof PropertiesOf<T>]: ValueObjectValue<T[key]>;
};
