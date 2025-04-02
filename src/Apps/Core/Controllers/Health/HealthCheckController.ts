import { isController } from '../../../../Contexts/Shared/Infrastructure';
import { BaseController } from '../BaseController';

@isController({
  method: 'GET',
  path: '/health',
})
export class HealthCheckController extends BaseController {
  protected async execute(): Promise<void> {
    await this.sendOk();
  }
}
