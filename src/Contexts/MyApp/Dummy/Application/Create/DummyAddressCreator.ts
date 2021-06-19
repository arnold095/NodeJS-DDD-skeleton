import { inject, injectable } from 'inversify';
import {
  DummyAddressCreatorRequest,
  DummyId,
  DummyNotFound,
  DummyRepository,
} from '@dummy';
import { EventBus } from '@sharedDomain';
import {
  DummyAddress,
  DummyAddressAlias,
  DummyAddressCity,
  DummyAddressCountry,
  DummyAddressId,
  DummyAddressPostalCode,
  DummyAddressStreet,
} from '@dummyAddress';

@injectable()
export class DummyAddressCreator {
  public constructor(
    @inject('DummyRepository') private readonly repository: DummyRepository,
    @inject('EventBus') private readonly eventBus: EventBus
  ) {}

  public async run(request: DummyAddressCreatorRequest): Promise<void> {
    const dummyId = new DummyId(request.dummyId);
    const dummy = await this.repository.find(dummyId);
    if (undefined === dummy) {
      throw new DummyNotFound();
    }
    const dummyAddress = DummyAddress.create(
      new DummyAddressId(request.id),
      dummyId,
      new DummyAddressAlias(request.alias),
      new DummyAddressStreet(request.street),
      new DummyAddressCity(request.city),
      new DummyAddressPostalCode(request.postalCode),
      new DummyAddressCountry(request.country)
    );
    dummy.saveAddress(dummyAddress);
    await this.repository.save(dummy);
    await this.eventBus.publish(dummy.pullDomainEvents());
  }
}
