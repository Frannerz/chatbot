const { jokes } = require("./jokes");
const { getWeather } = require("./weather");
const { openaiResponse } = require("./openai");
const commandLog = [];
const chatHistory = [];

const commandsList = {
  ping: (message) => replyToMessage(message, "Pong!"),
  greet: (message) =>
    replyToMessage(message, `Hello ${message.author.username}!`),
  joke: tellAJoke,
  //echo:
  help: help,
  log: logCommands,
  weather: getWeather,
  chat: chat,

};

function replyToMessage(msg, answer) {
  // Check if the answer is not undefined and not an empty string
  if (answer !== undefined && answer !== "") {
    msg.reply(answer);
  } else {
    console.warn("Tried to send an empty message. Ignoring.");
  }
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
function logCommands(message) {
  if (commandLog.length > 0) {
    message.channel.send(
      `Command Log:\n\`\`\`json\n${JSON.stringify(commandLog, null, 2)}\n\`\`\``
    );
  } else {
    message.channel.send("The command log is empty.");
  }
}

// Helper function to get a random joke
function getRandomJoke() {
  return jokes[Math.floor(Math.random() * jokes.length)];
}

// function to access openai
async function chat(message) {
  const prompt = message;

  if (prompt) {
    try {
      // Call the openaiResponse function and wait for the result
      const response = await openaiResponse(prompt);

      // log chat history 

      const chatElement = {
        user: message.author.username,
        prompt: prompt,
        response: response,
        timestamp: new Date(),
      };

      chatHistory.push(chatElement);

      console.log(chatHistory);


      // Send the response back to the user
      replyToMessage(message, response);
    } catch (error) {
      console.error("Error in openaiResponse:", error);
      replyToMessage(
        message,
        "An error occurred while processing the request."
      );
    }
  } else {
    // Inform the user that they need to provide a prompt
    replyToMessage(message, "Please provide a prompt after `!chat`.");
  }
}

module.exports = { commandsList, commandLog, chatHistory };

