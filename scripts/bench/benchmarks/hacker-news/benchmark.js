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

  function HeaderBar() {
    return e(
      'tr',
      {
        style: {
          backgroundColor: '#222',
        },
      },
      e(
        'table',
        {
          style: {
            padding: 4,
          },
          width: '100%',
          cellSpacing: 0,
          cellPadding: 0,
        },
        e(
          'tbody',
          null,
          e(
            'tr',
            null,
            e(
              'td',
              {
                style: {
                  width: 18,
                  paddingRight: 4,
                },
              },
              e(
                'a',
                {
                  href: '#',
                },
                e('img', {
                  src: 'logo.png',
                  width: 16,
                  height: 16,
                  style: {
                    border: '1px solid #00d8ff',
                  },
                })
              )
            ),
            e(
              'td',
              {
                style: {
                  lineHeight: '12pt',
                },
                height: 10,
              },
              e(
                'span',
                {
                  className: 'pagetop',
                },
                e('b', {className: 'hnname'}, 'React HN Benchmark'),
                e('a', {href: '#'}, 'new'),
                ' | ',
                e('a', {href: '#'}, 'comments'),
                ' | ',
                e('a', {href: '#'}, 'show'),
                ' | ',
                e('a', {href: '#'}, 'ask'),
                ' | ',
                e('a', {href: '#'}, 'jobs'),
                ' | ',
                e('a', {href: '#'}, 'submit')
              )
            )
          )
        )
      )
    );
  }

  function Story({story, rank}) {
    return [
      e(
        'tr',
        {
          className: 'athing',
        },
        e(
          'td',
          {
            style: {
              verticalAlign: 'top',
              textAlign: 'right',
            },
            className: 'title',
          },
          e(
            'span',
            {
              className: 'rank',
            },
            `${rank}.`
          )
        ),
        e(
          'td',
          {
            className: 'votelinks',
            style: {
              verticalAlign: 'top',
            },
          },
          e(
            'center',
            null,
            e(
              'a',
              {
                href: '#',
              },
              e('div', {
                className: 'votearrow',
