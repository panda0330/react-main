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
          char = code[i++];
          if (char === '"') {
            break;
          }
          string += char;
        } while (true);
        tokens.push({type: 'string', value: string});
        continue;
      }

      // Single quoted strings
      if (char === "'") {
        let string = '';
        i++;
        do {
          if (i > code.length) {
            throw Error('Missing a closing quote');
          }
          char = code[i++];
          if (char === "'") {
            break;
          }
          string += char;
        } while (true);
        tokens.push({type: 'string', value: string});
        continue;
      }

      // Whitespace
      if (/\s/.test(char)) {
        if (char === '\n') {
          return tokens;
        }
        i++;
        continue;
      }

      const next3 = code.slice(i, i + 3);
      if (next3 === '===') {
        tokens.push({type: '=='});
        i += 3;
        continue;
      }
      if (next3 === '!==') {
        tokens.push({type: '!='});
        i += 3;
        continue;
      }

      const next2 = code.slice(i, i + 2);
      switch (next2) {
        case '&&':
        case '||':
        case '==':
        case '!=':
          tokens.push({type: next2});
          i += 2;
          continue;
        case '//':
          // This is the beginning of a line comment. The rest of the line
          // is ignored.
          return tokens;
      }

      switch (char) {
        case '(':
        case ')':
        case '!':
          tokens.push({type: char});
          i++;
          continue;
      }

      // Names
      const nameRegex = /[a-zA-Z_$][0-9a-zA-Z_$]*/y;
      nameRegex.lastIndex = i;
      const match = nameRegex.exec(code);
      if (match !== null) {
        const name = match[0];
        switch (name) {
          case 'true': {
            tokens.push({type: 'boolean', value: true});
            break;
          }
          case 'false': {
            tokens.push({type: 'boolean', value: false});
            break;
          }
          default: {
            tokens.push({type: 'name', name});
          }
        }
        i += name.length;
        continue;
      }

      throw Error('Invalid character: ' + char);
    }
    return tokens;
  }


}

module.exports = transform;
