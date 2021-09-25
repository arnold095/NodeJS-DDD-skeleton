import { MongoDbUserAuthRepository } from '@authentication';
import { Arranger } from '../../Shared/Arranger';
import { UserAuthMother } from '../Domain/UserAuthMother';
import { UserAuthEmailMother } from '../Domain/UserAuthEmailMother';
import { UserAuthPasswordMother } from '../Domain/UserAuthPasswordMother';

let repository: MongoDbUserAuthRepository;
const existingEmail = UserAuthEmailMother.create('test@test.test');
const existingPassword = UserAuthPasswordMother.create('123qweQWE!');

beforeAll(async () => {
  await Arranger.run();
  repository = Arranger.container.get('Auth.UserAuthRepository');
  const user = UserAuthMother.create({
    email: existingEmail,
    password: existingPassword,
  });
  await repository.save(user);
});

afterEach(async () => {
  await repository.drop();
});

describe('MongoDbUserAuthRepository', () => {
  it('should save a new user', async () => {
    const user = UserAuthMother.create({});
    await expect(repository.save(user)).resolves.toBeUndefined();
  });

  it('should save and find user', async () => {
    const user = UserAuthMother.create({});
    await repository.save(user);
    const userFound = await repository.find(user.email);
    expect(userFound).not.toBeUndefined();
    expect(userFound?.email.value).toBe(user.email.value);
  });
});
