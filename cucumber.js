// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './dev.test.env' });
const common = ['--require-module ts-node/register'];

console.info('RUNNING ACCEPTANCE TESTS');
const e2e = [...common, '**/tests/**/*.feature', '--require **/tests/**/*.steps.ts'].join(
  ' ',
);

module.exports = {
  e2e,
};
