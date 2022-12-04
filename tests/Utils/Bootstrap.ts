import { App } from '../E2e/App';

export const Bootstrap = async (): Promise<App> => {
  const app = new App();
  await app.start();
  return app;
};
