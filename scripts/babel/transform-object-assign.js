/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const helperModuleImports = require('@babel/helper-module-imports');

module.exports = function autoImporter(babel) {
  function getAssignIdent(path, file, state) {
    if (state.id) {
      return state.id;
    }
    state.id = helperModuleImports.addDefault(path, 'shared/assign', {
      nameHint: 'assign',
    });
    return state.id;
  }

  return {
    pre: function () {
      // map from module to generated identifier
      this.id = null;
    },

    visitor: {
      CallExpression: function (path, file) {

};
