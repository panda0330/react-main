/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
// import {renderToString} from 'react-dom/server';
import {renderToPipeableStream} from 'react-dom/server';
import App from '../src/App';
import {DataProvider} from '../src/data';
import {API_DELAY, ABORT_DELAY} from './delays';

// In a real setup, you'd read it from webpack build stats.
let assets = {
  'main.js': '/main.js',
  'main.css': '/main.css',
};

module.exports = function render(url, res) {
  const data = createServerData();
  // This is how you would wire it up previously:
  //
  // res.send(
  //   '<!DOCTYPE html>' +
  //   renderToString(
  //     <DataProvider data={data}>
  //       <App assets={assets} />
  //     </DataProvider>,
  //   )
  // );

  // The new wiring is a bit more involved.
  
