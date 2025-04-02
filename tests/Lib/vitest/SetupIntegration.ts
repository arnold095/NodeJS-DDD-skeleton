import {
  clearConnectionEnvVars,
  overrideConnectionEnvVars,
} from '../../utils/overrideConnectionEnvVars';

beforeAll(() => {
  overrideConnectionEnvVars();
});

afterAll(() => {
  clearConnectionEnvVars();
});
