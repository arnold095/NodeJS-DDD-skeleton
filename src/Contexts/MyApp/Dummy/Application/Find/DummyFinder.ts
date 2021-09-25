import { DummyId, DummyNotFound, DummyRepository } from '@dummy';
import { DummyFinderResponse } from './DummyFinderResponse';
export class DummyFinder {
  public constructor(private readonly repository: DummyRepository) {}

  public async run(dummyId: string): Promise<DummyFinderResponse> {
    const id = new DummyId(dummyId);
    const dummy = await this.repository.find(id);
    if (undefined === dummy) {
      throw new DummyNotFound();
    }
    return DummyFinderResponse.response(dummy.toPrimitives());
  }
}
