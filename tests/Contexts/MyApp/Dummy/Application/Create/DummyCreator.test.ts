import * as map from 'source-map-support';
import 'reflect-metadata';
map.install();
import { DummyCreatorRequestMother } from "./DummyCreatorRequestMother";
import { DummyCreator } from "../../../../../../src/Contexts/MyApp/Dummy/Application/Create/DummyCreator";
import { DummyRepositoryMock } from "../../Mock/DummyRepositoryMock";
import { EventBusMock } from "../../../../Shared/Infrastructure/Mock/EventBusMock";
import { DummyIdMother } from "../../Domain/DummyIdMother";

const repository = new DummyRepositoryMock();
const mock = new EventBusMock();

describe('DummyCreator', () => {
    it('On create...', async () => {
        const dummyId = DummyIdMother.create();
        const dummyRequest = DummyCreatorRequestMother.create(dummyId);
        const dummyCreator = new DummyCreator(repository, mock);
        await dummyCreator.run(dummyRequest);
        const dummyFound = await repository.find(dummyId);
        expect(dummyRequest.id).toEqual(dummyFound.id.value);
    });
});
