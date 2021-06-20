import { WebServer } from '@sharedDomain';
import { InversifyAdapter } from '../../../src/Apps/Auth/DependencyContainer/InversifyAdapter';
import { join } from 'path';
import { Server } from 'http';
import { UserAuthEmailMother } from '../../Contexts/Auth/Authentication/Domain/UserAuthEmailMother';
import { UserAuthMother } from '../../Contexts/Auth/Authentication/Domain/UserAuthMother';
import {
  UserAuthPassword,
  UserAuthRepository,
} from '../../../src/Contexts/Auth/Authentication';
import { MongoDbClient } from '../../../src/Contexts/Shared/Infrastructure';

export class MockApp {
  private readonly server: WebServer;
  private readonly iocAdapter = new InversifyAdapter();
  private readonly serverPort = parseInt(
    process.env.SERVER_AUTHENTICATION_PORT ?? '3001'
  );

  private readonly EXISTING_EMAIL = UserAuthEmailMother.create('test@test.test');
  private readonly EXISTING_PASSWORD = '123qweQWE!';

  constructor() {
    this.server = this.iocAdapter.getClass<WebServer>('WebServer');
  }

  public async bootStrap(): Promise<void> {
    await this.loadMock();
    this.server.load(this.iocAdapter, this.serverPort, this.controllers());
  }

  private controllers(): string[] {
    return [join(__dirname, '../../../src/Apps/Auth/Controller/**/*.ts')];
  }

  private async loadMock() {
    const password = await UserAuthPassword.createAndHash(this.EXISTING_PASSWORD);
    const user = UserAuthMother.create({
      email: this.EXISTING_EMAIL,
      password,
    });
    const repository = this.iocAdapter.getClass<UserAuthRepository>('UserAuthRepository');
    await repository.save(user);
  }

  public httpServer(): Server {
    return this.server.httpServer();
  }

  public async close(): Promise<void> {
    const dbClient = this.iocAdapter.getClass<MongoDbClient>('MongoDbClient');
    dbClient.useCollection('users');
    await dbClient.drop();
    this.server.close();
  }
}
