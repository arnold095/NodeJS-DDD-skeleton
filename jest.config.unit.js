// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./jest.config');
config.collectCoverage = false;
config.testPathIgnorePatterns = ['Infrastructure/.*.ts'];
console.info('RUNNING UNIT TESTS');
module.exports = config;
