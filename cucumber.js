// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './dev.test.env' });
const common = [
  '--require-module ts-node/register',
  '--require-module tsconfig-paths/register',
];
console.info('RUNNING ACCEPTANCE TESTS');
const auth = [
  ...common,
  '**/tests/Apps/Auth/**/*.feature',
  '--require **/tests/Apps/Auth/**/*.steps.ts',
].join(' ');

module.exports = {
  auth,
};
