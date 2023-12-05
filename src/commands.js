const { jokes } = require("./jokes");
const { openaiResponse } = require("./openai");
const commandLog = [];

const commandsList = {
  ping: (message) => replyToMessage(message, "Pong!"),
  greet: (message) => replyToMessage(message, `Hello ${message.author.username}!`),
  joke: tellAJoke,
  //echo:
  help: help,
  log: logCommands,
  chat: chat,
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

//Function to display logged commands
function logCommands (message) {
  if (commandLog.length > 0) {
    message.channel.send(`Command Log:\n\`\`\`json\n${JSON.stringify(commandLog, null, 2)}\n\`\`\``);
  } else {
    message.channel.send('The command log is empty.');
  }
}

// Helper function to get a random joke
function getRandomJoke() {
  return jokes[Math.floor(Math.random() * jokes.length)];
}

// function to access openai

function chat(message) {
  return openaiResponse(message);
}

chat("why is the sky blue?")


module.exports = { commandsList, commandLog };

