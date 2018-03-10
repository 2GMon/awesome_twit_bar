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
