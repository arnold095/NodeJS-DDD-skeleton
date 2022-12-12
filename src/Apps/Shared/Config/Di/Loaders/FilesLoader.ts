import { sync } from 'fast-glob';
import { join } from 'path';

const rootPath = join(__dirname, '../../../../../');

const controllersPath = join(rootPath, '/Apps/**/Controllers/**/*Controller.{ts,js}');

const useCasesPath = join(rootPath, '/Contexts/**/Application/UseCases/**/*.{ts,js}');

const eventHandlersPath = join(
  rootPath,
  '/Contexts/**/Application/EventHandlers/**/*.{ts,js}',
);

const infrastructureServices = join(rootPath, '/Contexts/**/Infrastructure/**/*.{ts,js}');

/**
 * Is necessary to load all files before register the dependencies
 * because the decorators are executed when the file is imported
 */
export const filesLoader = async (): Promise<void> => {
  const files = sync([
    controllersPath,
    useCasesPath,
    eventHandlersPath,
    infrastructureServices,
  ]);

  await Promise.all(files.map(file => import(file)));
};
