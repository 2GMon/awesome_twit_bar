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

  getHomeTimeline(callback, count = 50) {
    const url = Twitter.API_ENDPOINT + 'statuses/home_timeline.json';
    this.Tw.get(
      url + "?count=" + count,
      localStorage.getItem('atw.accessTokenKey'),
      localStorage.getItem('atw.accessTokenSecret'),
      callback);
  }

  tweet(text) {
    const url = Twitter.API_ENDPOINT + 'statuses/update.json';
    this.Tw.post(
      url,
      localStorage.getItem('atw.accessTokenKey'),
      localStorage.getItem('atw.accessTokenSecret'),
      {"status": text},
      function(error, data) {
        if(error) {
          console.log(error);
        } else {
          console.log(data);
        }
      }
    )
  }
}
Twitter.API_ENDPOINT = "https://api.twitter.com/1.1/";

export const Tw = new Twitter();
