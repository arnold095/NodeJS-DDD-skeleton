import * as map from 'source-map-support';
import 'reflect-metadata';
import { UserAuthRepositoryMock } from "../../Mock/UserAuthRepositoryMock";
import { UserRegister } from "../../../../../src/Contexts/Auth/Authentication/Application/UserRegister";
import { EventBusMock } from "../../../Shared/Infrastructure/Mock/EventBusMock";
import { UserRegisterRequestMother } from "./UserRegisterRequestMother";
import { UserAuthEmailMother } from "../../Domain/UserAuthEmailMother";

map.install();

const repository = new UserAuthRepositoryMock();
const mock = new EventBusMock();

describe('UserRegister', () => {
    it('On register user...', async () => {
        const email = UserAuthEmailMother.create();
        const request = UserRegisterRequestMother.create(undefined, email.value);
        const userRegister = new UserRegister(repository, mock);
        await userRegister.run(request);
        const userFound = await repository.find(email);
        expect(request.id).toEqual(userFound.id.value);
    });
});
