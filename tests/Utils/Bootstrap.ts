import { App } from '../E2e/App';

export const bootstrap = async (): Promise<App> => {
  const app = new App();
  await app.start();
  return app;
};
