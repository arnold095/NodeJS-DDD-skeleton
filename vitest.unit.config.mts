import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

import { poolStrategy } from './vitest.config.mjs';

export default defineConfig({
	test: {
		name: 'unit',
		include: ['./tests/Unit/**/*.test.ts'],
		globals: true,
		pool: poolStrategy,
		isolate: false,
		coverage: {
			provider: 'v8',
			reportsDirectory: './tests/Unit/coverage',
			include: ['src/Contexts/**/*'],
			exclude: [
				'src/Apps/**/*',
				'src/Contexts/**/infrastructure/**/*',
				'test/builders/**/*',
			],
			reporter: 'html',
		},
	},
	plugins: [
		swc.vite({
			module: { type: 'nodenext' },
		}),
	],
});