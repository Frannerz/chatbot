const commandsList = {
  ping: (message) => replyToMessage(message, "Pong!"),
  greet: (message) => replyToMessage(message, "hello"),
  //joke:
  //echo:
  help: help,
};

function replyToMessage(msg, answer) {
  msg.reply(answer);
}

//function to tell a joke
function tellAJoke() {}

// help function lists all of the commands available
function help(message) {
  const availableCommands = Object.keys(commandsList).join(", ");
  replyToMessage(message, `Available commands: ${availableCommands}`);
}

// Echo Command- when a user types !echo [message], the bot will repeat the message back to them.
function echo() {}

// Command Logging: As a developer, I want the bot to log the use of commands
function logCommands() {}

module.exports = { commandsList };
