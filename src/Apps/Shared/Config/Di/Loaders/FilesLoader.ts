import { sync } from 'fast-glob';
import { join } from 'path';

const rootPath = join(__dirname, '../../../../../');

const paths = {
  controllers: join(rootPath, '/Apps/**/Controllers/**/*Controller.{ts,js}'),
  useCases: join(rootPath, '/Contexts/**/Application/UseCases/**/*.{ts,js}'),
  eventHandlers: join(rootPath, '/Contexts/**/Application/EventHandlers/**/*.{ts,js}'),
  infrastructureServices: join(rootPath, '/Contexts/**/Infrastructure/**/*.{ts,js}'),
};

/**
 * Is necessary to load all files before register the dependencies
 * because the decorators are executed when the file is imported
 */
export const filesLoader = async (): Promise<void> => {
  const files = sync([
    paths.controllers,
    paths.useCases,
    paths.eventHandlers,
    paths.infrastructureServices,
  ]);

  await Promise.all(files.map(file => import(file)));
};
