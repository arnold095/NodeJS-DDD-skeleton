import { glob } from 'glob';
import { join } from 'path';

const rootPath = join(__dirname, '../../../../../');

const controllersPath = join(rootPath, '/Apps/**/Controllers/**/*Controller.js');

const useCasesPath = join(rootPath, '/Contexts/**/Application/UseCases/**/*.js');

const eventHandlersPath = join(
  rootPath,
  '/Contexts/**/Application/EventHandlers/**/*.js',
);

const repositoriesPath = join(rootPath, '/Contexts/**/Infrastructure/**/*Repository.js');

const load = async (path: string): Promise<void> => {
  const files = glob.sync(path);

  await Promise.all(files.map(route => import(route)));
};

/**
 * Is necessary to load all files before register the dependencies
 * because the decorators are executed when the file is imported
 */
export const filesLoader = async (): Promise<void> => {
  await Promise.all(
    [controllersPath, useCasesPath, eventHandlersPath, repositoriesPath].map(path =>
      load(path),
    ),
  );
};