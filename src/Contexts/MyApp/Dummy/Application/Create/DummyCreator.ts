import { inject, injectable } from 'inversify';
import { EventBus } from '@sharedDomain';
import {
  Dummy,
  DummyAlreadyExist,
  DummyContent,
  DummyCreatorRequest,
  DummyEmail,
  DummyId,
  DummyRepository,
  DummyTitle,
} from '@dummy';
@injectable()
export class DummyCreator {
  constructor(
    @inject('DummyRepository') private readonly repository: DummyRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  public async run(request: DummyCreatorRequest): Promise<void> {
    const id = new DummyId(request.id);
    const title = new DummyTitle(request.title);
    const content = new DummyContent(request.content);
    const email = new DummyEmail(request.email);
    await this.ensureDoesNotExist(id);
    const dummy = Dummy.create(id, title, content, email);
    await this.repository.save(dummy);
    await this.eventBus.publish(dummy.pullDomainEvents());
  }

  private async ensureDoesNotExist(id: DummyId) {
    const dummy = await this.repository.find(id);
    if (undefined !== dummy) {
      throw new DummyAlreadyExist(403, 'Dummy already exists');
    }
  }
}
