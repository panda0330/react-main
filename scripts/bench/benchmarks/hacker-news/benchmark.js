(function () {
  'use strict';

  const e = React.createElement;

  function timeAge(time) {
    const now = new Date().getTime() / 1000;
    const minutes = (now - time) / 60;

    if (minutes < 60) {
      return Math.round(minutes) + ' minutes ago';
    }
    return Math.round(minutes / 60) + ' hours ago';
  }

  function getHostUrl(url) {
    return (url + '')
      .replace('https://', '')
      .replace('http://', '')
      .split('/')[0];
  }

