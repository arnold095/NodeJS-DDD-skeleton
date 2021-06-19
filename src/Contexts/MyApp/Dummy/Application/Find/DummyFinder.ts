import { inject, injectable } from 'inversify';
import { DummyRepository } from '../../Domain/DummyRepository';
import { Dummy } from '../../Domain/Dummy';
import { DummyFinderRequest } from './DummyFinderRequest';
import { DummyId } from '../../Domain/ValueObject/DummyId';
import { DummyNotFound } from '../../Domain/Exception/DummyNotFound';
@injectable()
export class DummyFinder {
  public constructor(
    @inject('DummyRepository') private readonly repository: DummyRepository
  ) {}

  public async run(params: DummyFinderRequest): Promise<Dummy> {
    const id = new DummyId(params.id);
    const dummy = await this.repository.find(id);
    if (undefined === dummy) {
      throw new DummyNotFound();
    }
    return dummy;
  }
}
