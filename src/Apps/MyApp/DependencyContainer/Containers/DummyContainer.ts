import { AdapterTypes } from '@/src/Contexts/Shared/Domain/Server/AdapterTypes';
import { DummyPostController } from '@/src/Apps/MyApp/Controller/Dummy/Post/DummyPostController';
import { DummyCreator } from '@/src/Contexts/MyApp/Dummy/Application/Create/DummyCreator';
import { DummyFinder } from '@/src/Contexts/MyApp/Dummy/Application/Find/DummyFinder';
import { TypeORMDummyRepository } from '@/src/Contexts/MyApp/Dummy/Infrastructure/TypeORMDummyRepository';
import { DummyAddressPostController } from '@/src/Apps/MyApp/Controller/Dummy/Post/DummyAddressPostController';
import { DummyAddressCreator } from '@/src/Contexts/MyApp/Dummy/Application/Create/DummyAddressCreator';
import { DummyGetController } from '@/src/Apps/MyApp/Controller/Dummy/Get/DummyGetController';

export class DummyContainer {
  public static container(): AdapterTypes {
    return {
      controllers: [DummyPostController, DummyGetController, DummyAddressPostController],
      services: [DummyCreator, DummyFinder, DummyAddressCreator],
      domainContracts: [
        {
          abstract: 'DummyRepository',
          concrete: TypeORMDummyRepository,
        },
      ],
    };
  }
}
