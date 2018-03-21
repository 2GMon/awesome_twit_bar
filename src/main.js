'use strict';

import { getMatchingCommand } from './cmd';
import { Tw } from './twitter';

var timeline = [];

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
      Tw.getHomeTimeline(homeTimelineCallback);
      var createData = {
        type: "detached_panel",
        url: "timeline.html",
        width: 600,
        height: 800
      };
      var creating = browser.windows.create(createData);
      creating.then(onCreated, onError);
      break;
    default:
      Tw.tweet(text);
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

function handleMessage(request, sender, sendResponse) {
  console.log("Message from the timeline: request type = " + request.type);
  sendResponse({data: timeline});
}

browser.runtime.onMessage.addListener(handleMessage);
