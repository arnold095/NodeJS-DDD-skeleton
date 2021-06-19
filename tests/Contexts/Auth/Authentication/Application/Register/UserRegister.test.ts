import * as map from 'source-map-support';
import 'reflect-metadata';
import { UserAuthRepositoryMock } from '../../Mock/UserAuthRepositoryMock';
import { EventBusMock } from '../../../../Shared/Infrastructure/Mock/EventBusMock';
import { UserAuthEmailMother } from '../../Domain/UserAuthEmailMother';
import { UserRegisterRequestMother } from './UserRegisterRequestMother';
import { UserRegister } from '@authentication';
import { JWTAuthorizationUserEncode, UserEncoder } from '@authorization';

map.install();

const repository = new UserAuthRepositoryMock();
const mock = new EventBusMock();
const encoder = new UserEncoder(new JWTAuthorizationUserEncode());
describe('UserRegister', () => {
  beforeEach(async () => {
    await repository.generate();
  });
  afterEach(() => {
    repository.clear();
  });

  it('Should register a user.', async () => {
    const email = UserAuthEmailMother.create();
    const request = UserRegisterRequestMother.create({ email: email.value });
    const userRegister = new UserRegister(repository, mock, encoder);
    await userRegister.run(request);
    const userFound = await repository.find(email);
    expect(request.id).toEqual(userFound?.id.value);
  });
});
