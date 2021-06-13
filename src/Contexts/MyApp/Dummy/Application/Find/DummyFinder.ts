import { inject, injectable } from 'inversify';
import { DummyRepository } from '../../Domain/DummyRepository';
import { Dummy } from '../../Domain/Dummy';
import { DummyFinderRequest } from './DummyFinderRequest';
import { DummyId } from '../../Domain/ValueObject/DummyId';
@injectable()
export class DummyFinder {
  public constructor(
    @inject('DummyRepository') private readonly repository: DummyRepository
  ) {}

  public async run(params: DummyFinderRequest): Promise<Dummy> {
    const id = new DummyId(params.id);
    return await this.repository.find(id);
  }
}
