'use strict';

import { OAuth } from 'oauth';

class Twitter {
  constructor() {
    this.Tw = new OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      'iTbIWCEeWJnOxNnqfU8ZnA',
      '2cK0UZmIuwtAaoeJ02Rd6dADjy6nrMp8Zd0tHbaR0',
      '1.0A',
      null,
      'HMAC-SHA1'
    );
  }

  getHomeTimeline(callback) {
    this.Tw.get(
      'https://api.twitter.com/1.1/statuses/home_timeline.json',
      localStorage.getItem('atw.accessTokenKey'),
      localStorage.getItem('atw.accessTokenSecret'),
      callback);
  }
}

export const Tw = new Twitter();