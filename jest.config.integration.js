require('dotenv').config({path: './test.env'})
const config = require('./jest.config');
config.collectCoverage = false;
config.testPathIgnorePatterns = ['Application/.*.ts'];
console.log('RUNNING INTEGRATION TESTS');
module.exports = config;
