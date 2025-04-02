// biome-ignore lint/complexity/noBannedTypes: <explanation>
export interface Class<T> extends Function {
  prototype: T;
}
