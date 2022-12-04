type Options = {
  max?: number;
  min?: number;
};

export class NumberMother {
  public static random(options?: Options): number {
    const min = options?.min ?? 1;
    const max = options?.max ?? 1000;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
