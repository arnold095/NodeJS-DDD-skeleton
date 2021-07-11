'use strict';
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const ts = require('typescript');
const transformer = {
  process(sourceText, sourcePath, config, options) {
    const transpiled = ts.transpileModule(sourceText, {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    });
    return {
      code: transpiled.outputText,
    };
  },
};
module.exports = transformer;
