browser.omnibox.setDefaultSuggestion({
  description: `Tweet (e.g. "hello world")`
});

authCommands = [
  {content: "!getPIN", description: "Opens the page to authorize Awesome Twit Bar and get your PIN from Twitter."},
  {content: "!setPIN", description: "Allows Awesome Twit Bar to access Twitter by signifying your PIN."}
];

function getMatchingAuthCommand(input) {
  var result = [];
  for (cmd of authCommands) {
    if (cmd.content.indexOf(input) === 0) {
      console.log(cmd);
      result.push(cmd);
    }
  }
  return result;
}

// Update the suggestions whenever the input is changed.
browser.omnibox.onInputChanged.addListener((text, addSuggestions) => {
  if (text[0] == '!') {
    console.log("commands: " + text);
    addSuggestions(getMatchingAuthCommand(text));
  } else {
    console.log("tweet: " + text);
  }
});

// Open the page based on how the user clicks on a suggestion.
browser.omnibox.onInputEntered.addListener((text, disposition) => {
  switch (text) {
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
