import { inject, injectable } from 'inversify';
import { DummyAddressCreatorRequest, DummyId, DummyRepository } from '@dummy';
import { EventBus } from '@sharedDomain';
import { DummyAddressAdder } from '../../Domain/Services/DummyAddressAdder';
import {
  DummyAddressAlias,
  DummyAddressCity,
  DummyAddressCountry,
  DummyAddressId,
  DummyAddressPostalCode,
  DummyAddressStreet,
} from '@dummyAddress';

@injectable()
export class DummyAddressCreator {
  private dummyAddressAdder: DummyAddressAdder;

  public constructor(
    @inject('DummyRepository') private readonly repository: DummyRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {
    this.dummyAddressAdder = new DummyAddressAdder(this.repository);
  }

  public async run(request: DummyAddressCreatorRequest): Promise<void> {
    const id = new DummyAddressId(request.id);
    const dummyId = new DummyId(request.dummyId);
    const alias = new DummyAddressAlias(request.alias);
    const street = new DummyAddressStreet(request.street);
    const city = new DummyAddressCity(request.city);
    const postalCode = new DummyAddressPostalCode(request.postalCode);
    const country = new DummyAddressCountry(request.country);
    const dummy = await this.dummyAddressAdder.run(
      id,
      dummyId,
      alias,
      street,
      city,
      postalCode,
      country
    );
    await this.repository.save(dummy);
    await this.eventBus.publish(dummy.pullDomainEvents());
  }
}
