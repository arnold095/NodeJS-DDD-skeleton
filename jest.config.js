/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: './dev.test.env' });
const tsconfig = require('./tsconfig.json');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: true,
      isolatedModules: true,
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper,
  testEnvironment: 'node',
  transform: {
    '\\.ts$': './jest.transformer',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: ['**/tests/**/*.test.ts?(x)'],
};
