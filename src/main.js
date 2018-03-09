'use strict';

import { getMatchingCommand } from './cmd';

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
      var createData = {
        type: "detached_panel",
        url: "timeline.html",
        width: 480,
        height: 640
      };
      var creating = browser.windows.create(createData);
      creating.then(onCreated, onError);
      break;
    case "!getPIN":
      openLink("https://www.google.co.jp", disposition);
      break;
    case "!setPIN":
      console.log("hoge aaa");
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
