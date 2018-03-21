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
      if (timeline.length != 0) {
        createTimelineWindow();
      }
      break;
    default:
      Tw.tweet(text);
      break;
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
  let initialTime = (timeline.length == 0);

  if (e) console.error(e);
  let fetched = JSON.parse(data).map(t => {
    t["created_at"] = (new Date(t["created_at"])).toLocaleString();
    return t;
  });
  timeline = fetched.concat(timeline).slice(0, 100);
  console.log(fetched);
  console.log(timeline);

  Tw.latestId = timeline[0].id_str;

  if (initialTime) {
    createTimelineWindow();
  }
}

function handleMessage(request, sender, sendResponse) {
  console.log("Message received: request type = " + request.type);
  console.log("sender: ");
  console.log(sender);
  switch (request.type) {
    case "get_home_timeline":
      sendResponse({data: timeline});
      break;
  }
}

browser.runtime.onMessage.addListener(handleMessage);
