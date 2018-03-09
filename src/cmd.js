'use strict';

const commands = [
  {content: "! ", description: "Opens your timeline page."},
  {content: "!getPIN", description: "Opens the page to authorize Awesome Twit Bar and get your PIN from Twitter."},
  {content: "!setPIN", description: "Allows Awesome Twit Bar to access Twitter by signifying your PIN."}
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
