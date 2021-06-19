import { MongoDbClient } from '@sharedInfra';
import {
  UserAuth,
  UserAuthEmail,
  UserAuthPrimitives,
  UserAuthRepository,
} from '@authentication';
import { Nullable } from '@sharedDomain';
import { injectable } from 'inversify';

@injectable()
export class MongoDbUserAuthRepository
  extends MongoDbClient
  implements UserAuthRepository
{
  protected collection = 'users';
  private readonly PROJECTION = {
    id: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    password: 1,
    dateAdd: 1,
    dateUpd: 1,
  };

  public async find(email: UserAuthEmail): Promise<Nullable<UserAuth>> {
    let userAuth;
    const userFound = await this.searchOne<UserAuthPrimitives>(
      { email: email.value },
      this.PROJECTION
    );
    if (userFound) {
      userAuth = UserAuth.fromPrimitives(userFound);
    }
    return userAuth;
  }

  public async save(user: UserAuth): Promise<void> {
    await this.upsert({ email: user.email.value }, user.toPrimitives());
  }
}
