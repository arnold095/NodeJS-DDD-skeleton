import { defineConfig } from 'vitest/config';

import { e2eTests, integrationTests, unitTests } from "./vitest.ci.config.mjs";
import swc from "unplugin-swc";

const pool = process.arch === 'arm64' ? 'threads' : 'forks';

export default defineConfig(({ mode }) => {
    mode = mode === 'test' ? 'unit' : mode;

    const allConfigurations = {
        unit: unitTests,
        integration: integrationTests,
        e2e: e2eTests,
        all: {
            include: [
                ...unitTests.include,
                ...integrationTests.include,
                ...e2eTests.include
            ],
            exclude: [
                ...unitTests.exclude,
                ...integrationTests.exclude,
                ...e2eTests.exclude
            ],
            extraConfig: {
                testTimeout: 30000,
                globalSetup: 'test/lib/vitest/global.setup.integration.ts',
                setupFiles: ['test/lib/vitest/SetupIntegration.ts'],
            },
            plugins: [
                // This is required to build the test files with SWC
                swc.vite({
                    // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
                    module: { type: 'es6' },
                }),
            ],
        },
    }

    const parsedMode = mode ?? 'unit';

    const {
        include,
        exclude,
        extraConfig,
        plugins,
    } = allConfigurations[parsedMode];

    return {
        test: {
            include,
            exclude,
            globals: true,
            environment: 'node',
            pool,
            poolOptions: {
                [pool]: {
                    isolate: false
                }
            },
            ...extraConfig,
        },
        plugins,
    }
});
