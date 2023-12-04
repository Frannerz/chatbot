const { jokes } = require("./jokes");

const commandsList = {
  ping: (message) => replyToMessage(message, "Pong!"),
  greet: (message) => replyToMessage(message, `Hello ${message.author.username}!`),
  joke: tellAJoke,
  //echo:
  help: help,
};

function replyToMessage(msg, answer) {
  msg.reply(answer);
}

// Function to tell a joke with a delay
async function tellAJoke(message) {
  const joke = getRandomJoke();
  await replyToMessage(message, `${joke.question}`);

  // Delay for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  await replyToMessage(message, `${joke.answer}`);
}

// help function lists all of the commands available
function help(message) {
  const availableCommands = Object.keys(commandsList).join(", ");
  replyToMessage(message, `Available commands: ${availableCommands}`);
}

// Echo Command- when a user types !echo [message], the bot will repeat the message back to them.
//function echo() {}

// Command Logging: As a developer, I want the bot to log the use of commands
//function logCommands() {}

// Helper function to get a random joke
function getRandomJoke() {
  return jokes[Math.floor(Math.random() * jokes.length)];
}


module.exports = { commandsList };
