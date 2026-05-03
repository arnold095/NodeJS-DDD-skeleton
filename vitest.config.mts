import { defineConfig } from 'vitest/config';

export const poolStrategy = process.arch === 'arm64' ? 'threads' : 'forks';

export default defineConfig({
	test: {
		projects: [
			'./vitest.unit.config.mts',
			'./vitest.integration.config.mts',
			'./vitest.e2e.config.mts',
		],
		exclude: ['node_modules/**'],
		globals: true,
		pool: poolStrategy,
		isolate: false,
	},
});