const { jokes } = require("./jokes");

const commandsList = {
  ping: (message) => replyToMessage(message, "Pong!"),
  greet: (message) => replyToMessage(message, "hello"),
  joke: tellAJoke,
  //echo:
  //help:
};

function replyToMessage(msg, answer) {
  msg.reply(answer);
}

//function to tell a joke
function tellAJoke(message) {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  replyToMessage(message, randomJoke);
}

// help function should list all of the commands available (object.keys(commandsList))?
function help() {}

// Echo Command- when a user types !echo [message], the bot will repeat the message back to them.
function echo() {}

// Command Logging: As a developer, I want the bot to log the use of commands
function logCommands() {}

module.exports = { commandsList };
