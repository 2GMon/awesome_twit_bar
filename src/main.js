'use strict';

import { getMatchingCommand,
  getMatchingScreenName,
  getMatchingTweet
} from './cmd';
import { Tw } from './twitter';

var timeline = [];
var mentionsTimeline = [];

browser.omnibox.setDefaultSuggestion({
  description: `Tweet (e.g. "hello world")`
});

// Update the suggestions whenever the input is changed.
browser.omnibox.onInputChanged.addListener((text, addSuggestions) => {
  console.log("commands: " + text);
  if (text[0] == '!') {
    if (text[1] == '@') {
      if (text.indexOf('#') > 2) {
        addSuggestions(getMatchingTweet(timeline, text));
      } else {
        addSuggestions(getMatchingScreenName(timeline, text));
      }
    } else {
      console.log("commands: " + text);
      addSuggestions(getMatchingCommand(text));
    }
  }
});

// Open the page based on how the user clicks on a suggestion.
browser.omnibox.onInputEntered.addListener((text, disposition) => {
  text = text.trim();
  if (text == "!") {
    createTimelineWindow();
  } else if (text[0] == "!" && text[1] == "@") {
    var screen_name = text.slice(2, text.indexOf('#'));
    var statusId = text.slice(text.indexOf('#') + 1);
    var text = '@' + screen_name + ' ' + text.slice(text.indexOf(' ') + 1);
    Tw.tweet(text, statusId);
  } else {
    Tw.tweet(text);
  }
});

function createTimelineWindow() {
  var createData = {
    type: "detached_panel",
    url: "timeline.html",
    width: 600,
    height: 800
  };
  var creating = browser.windows.create(createData);
  creating.then(onCreated, onError);
}

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

function homeTimelineCallback(e, data, res) {
  if (e) console.error(e);
  let fetched = JSON.parse(data).map(t => {
    t["created_at"] = (new Date(t["created_at"])).toLocaleString();
    return t;
  });
  timeline = fetched.concat(timeline).slice(0, 100);
  console.log(fetched);
  console.log(timeline);

  Tw.latestId = timeline[0].id_str;
}

function meintionsTimelineCallback(e, data, res) {
  if (e) console.error(e);
  let fetched = JSON.parse(data).map(t => {
    t["created_at"] = (new Date(t["created_at"])).toLocaleString();
    return t;
  });
  mentionsTimeline = fetched.concat(mentionsTimeline).slice(0, 100);
  console.log(fetched);
  console.log(mentionsTimeline);
}

function handleMessage(request, sender, sendResponse) {
  console.log("Message received: request type = " + request.type);
  console.log("sender: ");
  console.log(sender);
  switch (request.type) {
    case "get_home_timeline":
      sendResponse({data: timeline});
      break;
    case "api_key_initialized":
      Tw.getHomeTimeline(homeTimelineCallback);
      break;
  }
}

browser.runtime.onMessage.addListener(handleMessage);

Tw.getHomeTimeline(homeTimelineCallback);
setInterval(function() {
  Tw.getHomeTimeline(homeTimelineCallback);
}, 1000 * 120);
