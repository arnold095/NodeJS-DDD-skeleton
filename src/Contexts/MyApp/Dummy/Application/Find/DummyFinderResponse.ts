import { Expose, plainToClass } from 'class-transformer';
import { DummyPrimitives } from '@dummy';

export class DummyFinderResponse {
  @Expose() id!: string;
  @Expose() title!: string;
  @Expose() content!: string;
  @Expose() email!: string;
  @Expose() addresses!: [];

  public static response(dummy: DummyPrimitives): DummyFinderResponse {
    return plainToClass(DummyFinderResponse, dummy, {
      excludeExtraneousValues: true,
    });
  }
}
