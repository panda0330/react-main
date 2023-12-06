'use strict';

/* eslint-disable no-for-of-loops/no-for-of-loops */

const getComments = require('./getComments');

function transform(babel) {
  const {types: t} = babel;

  // A very stupid subset of pseudo-JavaScript, used to run tests conditionally
  // based on the environment.
  //
  // Input:
  //   @gate a && (b || c)
  //   test('some test', () => {/*...*/})
  //
  // Output:
  //   @gate a && (b || c)
  //   _test_gate(ctx => ctx.a && (ctx.b || ctx.c), 'some test', () => {/*...*/});
  //
  // expression     →  binary ( ( "||" | "&&" ) binary)* ;
  // binary         →  unary ( ( "==" | "!=" | "===" | "!==" ) unary )* ;
  // unary          →  "!" primary
  //                |  primary ;
  // primary        →  NAME | STRING | BOOLEAN
  //                |  "(" expression ")" ;
  function tokenize(code) {
    const tokens = [];
    let i = 0;
    while (i < code.length) {
      let char = code[i];
      // Double quoted strings
      if (char === '"') {
        let string = '';
        i++;
        do {
          if (i > code.length) {
            throw Error('Missing a closing quote');
          }

}

module.exports = transform;
