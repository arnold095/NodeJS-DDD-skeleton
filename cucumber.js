// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './.env.test' });
const common = ['--require-module @swc/register'];

console.info('RUNNING ACCEPTANCE TESTS');
const e2e = [...common, './tests/**/*.feature', '--require ./tests/**/*.steps.ts'].join(
  ' ',
);

module.exports = {
  e2e,
};
