import { join } from 'node:path';
import { sync } from 'fast-glob';

const rootPath = join(__dirname, '../../../../');

const paths = {
  controllers: join(rootPath, '/Apps/**/Controllers/**/*Controller.{ts,js}'),
  applicationServices: join(rootPath, '/Contexts/**/Application/**/*.{ts,js}'),
  infrastructureServices: join(rootPath, '/Contexts/**/Infrastructure/**/*.{ts,js}'),
};

/**
 * Is necessary to load all files before register the dependencies
 * because the decorators are executed when the file is imported
 */
export const filesLoader = async (): Promise<void> => {
  const files = sync([
    paths.controllers,
    paths.applicationServices,
    paths.infrastructureServices,
  ]);

  await Promise.all(files.map(file => import(file)));
};
