import { join } from 'node:path';
import swc from 'unplugin-swc';

const testPaths = {
  included: {
    unit: [join(__dirname, 'tests/Unit/**/*.test.ts')],
    integration: [join(__dirname, 'tests/Integration/**/*.test.ts')],
    e2e: [join(__dirname, 'tests/E2e/**/*.test.ts')],
  },
  excluded: {
    unit: [],
    integration: [],
    e2e: [],
  },
}

export const unitTests = {
  include: testPaths.included.unit,
  exclude: testPaths.excluded.unit,
  extraConfig: {},
  plugins: [],
  coverage: {},
};

export const integrationTests = {
  include: testPaths.included.integration,
  exclude: testPaths.excluded.integration,
  extraConfig: {
    testTimeout: 30000,
    globalSetup: join(__dirname, 'tests/Lib/vitest/global.setup.integration.ts'),
    setupFiles: [
      join(__dirname, 'tests/Lib/vitest/SetupIntegration.ts'),
    ],
  },
  plugins: [],
  coverage: {},
}

export const e2eTests = {
  include: testPaths.included.e2e,
  exclude: testPaths.excluded.e2e,
  extraConfig: {
    testTimeout: 30000,
    globalSetup: join(__dirname, 'tests/Lib/vitest/global.setup.integration.ts'),
    setupFiles: [
      join(__dirname, 'tests/Lib/vitest/SetupIntegration.ts'),
    ],
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
  ],
  coverage: {},
}
