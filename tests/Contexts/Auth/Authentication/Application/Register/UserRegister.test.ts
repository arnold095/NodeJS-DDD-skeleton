import * as map from 'source-map-support';
import 'reflect-metadata';
import {
  JWTAuthorizationUserEncode,
  UserEncoder,
} from '../../../../../../src/Contexts/Auth/Authorization';
import { UserAuthRepositoryMock } from '../../Mock/UserAuthRepositoryMock';
import { EventBusMock } from '../../../../Shared/Infrastructure/Mock/EventBusMock';
import { UserAuthEmailMother } from '../../Domain/UserAuthEmailMother';
import { UserRegisterRequestMother } from './UserRegisterRequestMother';
import { UserRegister } from '../../../../../../src/Contexts/Auth/Authentication';

map.install();

const repository = new UserAuthRepositoryMock();
const mock = new EventBusMock();
const encoder = new UserEncoder(new JWTAuthorizationUserEncode());

describe('UserRegister', () => {
  it('On register user...', async () => {
    const email = UserAuthEmailMother.create();
    const request = UserRegisterRequestMother.create(undefined, email.value);
    const userRegister = new UserRegister(repository, mock, encoder);
    await userRegister.run(request);
    const userFound = await repository.find(email);
    expect(request.id).toEqual(userFound.id.value);
  });
});
