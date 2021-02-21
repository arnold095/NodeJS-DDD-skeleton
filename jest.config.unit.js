const config = require('./jest.config');
config.collectCoverage = false;
config.testPathIgnorePatterns = ['Infrastructure/.*.ts'];
console.log('RUNNING UNIT TESTS');
module.exports = config;
