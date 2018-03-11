'use strict';

import { getMatchingCommand } from './cmd';

import { OAuth } from 'oauth';

browser.omnibox.setDefaultSuggestion({
  description: `Tweet (e.g. "hello world")`
});


// Update the suggestions whenever the input is changed.
browser.omnibox.onInputChanged.addListener((text, addSuggestions) => {
  if (text[0] == '!') {
    console.log("commands: " + text);
    addSuggestions(getMatchingCommand(text));
  } else {
    console.log("tweet: " + text);
  }
});

// Open the page based on how the user clicks on a suggestion.
browser.omnibox.onInputEntered.addListener((text, disposition) => {
  text = text.trim();
  switch (text) {
    case "!":
      getHomeTimeline();
      var createData = {
        type: "detached_panel",
        url: "timeline.html",
        width: 480,
        height: 640
      };
      var creating = browser.windows.create(createData);
      creating.then(onCreated, onError);
      break;
  }
});

function openLink(url, disposition) {
  switch (disposition) {
    case "currentTab":
      browser.tabs.update({url});
      break;
    case "newForegroundTab":
      browser.tabs.create({url});
      break;
    case "newBackgroundTab":
      browser.tabs.create({url, active: false});
      break;
  }
}

function onCreated(windowInfo) {
  console.log(`Created window: ${windowInfo.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function getHomeTimeline() {
  var oauth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'iTbIWCEeWJnOxNnqfU8ZnA',
    '2cK0UZmIuwtAaoeJ02Rd6dADjy6nrMp8Zd0tHbaR0',
    '1.0A',
    null,
    'HMAC-SHA1'
  );
  oauth.get(
    'https://api.twitter.com/1.1/statuses/home_timeline.json',
    localStorage.getItem('atw.accessTokenKey'),
    localStorage.getItem('atw.accessTokenSecret'),
    function (e, data, res){
      if (e) console.error(e);
      console.log(require('util').inspect(data));
      done();
    });
}
