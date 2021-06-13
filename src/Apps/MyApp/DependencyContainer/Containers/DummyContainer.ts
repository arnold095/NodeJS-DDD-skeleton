import { AdapterTypes } from '@sharedDomain';
import { DummyPostController } from '../../Controller/Dummy/Post/DummyPostController';
import {
  DummyAddressCreator,
  DummyCreator,
  DummyFinder,
  RedisDummyRepository,
} from '@dummy';
import { DummyGetController } from '../../Controller/Dummy/Get/DummyGetController';
import { DummyAddressPostController } from '../../Controller/Dummy/Post/DummyAddressPostController';

export class DummyContainer {
  public static container(): AdapterTypes {
    return {
      controllers: [DummyPostController, DummyGetController, DummyAddressPostController],
      services: [DummyCreator, DummyFinder, DummyAddressCreator],
      domainContracts: [
        {
          abstract: 'DummyRepository',
          concrete: RedisDummyRepository,
        },
      ],
    };
  }
}
