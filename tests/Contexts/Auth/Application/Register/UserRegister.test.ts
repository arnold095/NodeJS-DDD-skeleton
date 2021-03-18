import * as map from 'source-map-support';
map.install();
import 'reflect-metadata';
import { UserAuthRepositoryMock } from "../../Mock/UserAuthRepositoryMock";
import { UserRegister } from "../../../../../src/Contexts/Auth/Application/UserRegister";
import { EventBusMock } from "../../../Shared/Infrastructure/Mock/EventBusMock";
import { UserRegisterRequestMother } from "./UserRegisterRequestMother";

const repository = new UserAuthRepositoryMock();
const mock = new EventBusMock();

describe('UserRegister', () => {
    it('On register user...', async () => {
        const request = UserRegisterRequestMother.create();
        const applicationService = new UserRegister(repository, mock);
        await applicationService.run(request);
    });
});
