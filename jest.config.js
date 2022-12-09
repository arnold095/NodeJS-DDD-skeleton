require('dotenv').config({ path: './.env.test' });

/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {
  testMatch: ['<rootDir>/**/*.test.ts'],
  setupFilesAfterEnv: ['./tests/Lib/Setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testEnvironmentOptions: { node: true },
  transform: {
    '^.+\\.tsx?$': ['@swc/jest'],
  },
};
