/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const helperModuleImports = require('@babel/helper-module-imports');

module.exports = function replaceConsoleCalls(babel) {
  let consoleErrors = new WeakMap();
  function getConsoleError(path, file) {
    if (!consoleErrors.has(file)) {
      consoleErrors.set(
        file,
        helperModuleImports.addNamed(
          path,
          'error',
          'shared/consoleWithStackDev',
          {nameHint: 'consoleError'}
        )
      );
    }
    return babel.types.cloneDeep(consoleErrors.get(file));
  }

  let consoleWarns = new WeakMap();
  function getConsoleWarn(path, file) {
    if (!consoleWarns.has(file)) {
      consoleWarns.set(
        file,
        helperModuleImports.addNamed(
          path,
          'warn',
          'shared/consoleWithStackDev',
          {nameHint: 'consoleWarn'}
        )
      );
    }

};
