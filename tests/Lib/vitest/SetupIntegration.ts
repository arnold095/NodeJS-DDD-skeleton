import {
  clearConnectionEnvVars,
  overrideConnectionEnvVars,
} from '../../Utils/overrideConnectionEnvVars';

beforeAll(() => {
  overrideConnectionEnvVars();
});

afterAll(() => {
  clearConnectionEnvVars();
});
