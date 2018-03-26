'use strict';

const commands = [
  {content: "! ", description: "Opens your timeline page."},
];

export function getMatchingCommand(input) {
  var result = [];
  for (let cmd of commands) {
    if (cmd.content.indexOf(input) === 0) {
      console.log(cmd);
      result.push(cmd);
    }
  }
  return result;
}

export function getMatchingScreenName(timeline, input) {
  let result = [];
  let screen_name = input.slice(2);
  for (let tweet of timeline) {
    if (tweet.user.screen_name.indexOf(screen_name) === 0) {
      result.push({content: "!@" + tweet.user.screen_name, description: tweet.user.name});
    }
  }
  return result;
}

export function getMatchingTweet(timeline, input) {
  let result = [];
  let screen_name = input.slice(2, input.indexOf('#'));
  let statusId = input.slice(input.indexOf('#') + 1);
  for (let tweet of timeline) {
    if (tweet.user.screen_name.indexOf(screen_name) === 0) {
      if (tweet.id_str.indexOf(statusId) === 0) {
        result.push({content: "!@" + tweet.user.screen_name + "#" + tweet.id_str, description: tweet.text});
      }
    }
  }
  return result;
}
