import { glob } from 'glob';
import { join } from 'path';

const rootPath = join(__dirname, '../../../../../');

const controllersPath = join(rootPath, '/**/Controllers/**/*.js');

const useCasesPath = join(rootPath, '/Contexts/**/Application/UseCases/**/*.js');

const eventHandlersPath = join(
  rootPath,
  '/Contexts/**/Application/EventHandlers/**/*.js',
);

const load = async (path: string): Promise<void> => {
  const files = glob.sync(path);

  await Promise.all(files.map(route => import(route)));
};

export const loadFilesHelper = async (): Promise<void> => {
  await Promise.all(
    [controllersPath, useCasesPath, eventHandlersPath].map(path => load(path)),
  );
};
