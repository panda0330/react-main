'use strict';

const Lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const stats = require('stats-analysis');
const config = require('lighthouse/lighthouse-core/config/perf-config');
const spawn = require('child_process').spawn;
const os = require('os');

const timesToRun = 10;

function wait(val) {
  return new Promise(resolve => setTimeout(resolve, val));
}

async function runScenario(benchmark, chrome) {
  const port = chrome.port;
  const results = await Lighthouse(
    `http://localhost:8080/${benchmark}/`,
    {
      output: 'json',
      port,
    },
    config
  );

  const perfMarkings = results.lhr.audits['user-timings'].details.items;
  const entries = perfMarkings
    .filter(({timingType}) => timingType !== 'Mark')
    .map(({duration, name}) => ({
      entry: name,
      time: duration,
    }));
  entries.push({
    entry: 'First Meaningful Paint',
    time: results.lhr.audits['first-meaningful-paint'].rawValue,
  });

  return entries;
}

function bootstrap(data) {
  const len = data.length;
  const arr = Array(len);
  for (let j = 0; j < len; j++) {
    arr[j] = data[(Math.random() * len) | 0];
  }
  return arr;
}

function calculateStandardErrorOfMean(data) {
  const means = [];
  for (let i = 0; i < 10000; i++) {
    means.push(stats.mean(bootstrap(data)));
  }
  return stats.stdev(means);
}

function calculateAverages(runs) {
  const data = [];
  const averages = [];


}

module.exports = runBenchmark;
