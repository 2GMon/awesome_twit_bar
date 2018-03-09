'use strict';

const authCommands = [
  {content: "!getPIN", description: "Opens the page to authorize Awesome Twit Bar and get your PIN from Twitter."},
  {content: "!setPIN", description: "Allows Awesome Twit Bar to access Twitter by signifying your PIN."}
];

export function getMatchingAuthCommand(input) {
  var result = [];
  for (let cmd of authCommands) {
    if (cmd.content.indexOf(input) === 0) {
      console.log(cmd);
      result.push(cmd);
    }
  }
  return result;
}
