import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

import { poolStrategy } from './vitest.config.mjs';

const excludedTestRoutes = [];

export default defineConfig({
	test: {
		name: 'e2e',
		include: ['./tests/E2e/**/*.test.ts'],
		exclude: excludedTestRoutes,
		globals: true,
		testTimeout: 30000,
		globalSetup: 'tests/Lib/vitest/global.setup.integration.ts',
		setupFiles: ['tests/Lib/vitest/SetupIntegration.ts'],
		pool: poolStrategy,
		isolate: false,
	},
	plugins: [
		swc.vite({
			module: { type: 'nodenext' },
		}),
	],
});