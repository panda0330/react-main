'use strict';

/* eslint-disable no-for-of-loops/no-for-of-loops */

const getComments = require('./getComments');

const GATE_VERSION_STR = '@reactVersion ';
const REACT_VERSION_ENV = process.env.REACT_VERSION;

function transform(babel) {
  const {types: t} = babel;

  // Runs tests conditionally based on the version of react (semver range) we are running
  // Input:
  //   @reactVersion >= 17.0
  //   test('some test', () => {/*...*/})
  //
  // Output:
  //    @reactVersion >= 17.0
  //   _test_react_version('>= 17.0', 'some test', () => {/*...*/});
  //
  // See info about semver ranges here:
  // https://www.npmjs.com/package/semver
  function buildGateVersionCondition(comments) {
    if (!comments) {
      return null;
    }

    const resultingCondition = comments.reduce(
      (accumulatedCondition, commentLine) => {
        const commentStr = commentLine.value.trim();

        if (!commentStr.startsWith(GATE_VERSION_STR)) {
          return accumulatedCondition;
        }

        const condition = commentStr.slice(GATE_VERSION_STR.length);
        if (accumulatedCondition === null) {
          return condition;
        }

        return accumulatedCondition.concat(' ', condition);
      },
      null
    );


}

module.exports = transform;
