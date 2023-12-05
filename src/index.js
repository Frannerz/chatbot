require("dotenv").config();
const {
  Client,
  IntentsBitField,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const { commandsList, commandLog } = require("./commands");

const prefix = "!";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const mentionsLog = [];

client.once("ready", (c) => {
  console.log(`${c.user.tag} is online!`);
  //   if (channel) {
  //     channel.send(`${c.user.tag} is online! Type !help to view possible commands.`);
  //   } else {
  //     console.error('Text channel not found.')
  //   }
});

client.on("messageCreate", (message) => {
  console.log(`Received message: ${message.content}`);
  if (message.author.bot || !message.content.startsWith(prefix)) {
    return;
  }
  console.log(`Processing message: ${message.content}`);

  if (message.mentions.has(client.user.id)) {
    const mentionInfo = {
      content: message.content,
      author: message.author.username,
      timestamp: new Date(),
      channel: message.channel.name,
    };

    mentionsLog.push(mentionInfo);

    console.log(`Bot mentioned in message: ${message.content}`);
    console.log(mentionsLog);
  }

  // check if the bot has been mentioned and set botMentioned variable to true or false
  const botMentioned =
    message.mentions.has(client.user.id) || message.channel.type === 1;
  console.log(`Bot mentioned: ${botMentioned}`);

  if (
    message.author.bot ||
    (!message.content.startsWith(prefix) && !botMentioned)
  ) {
    console.log("message ignored!");
    return;
  }

  //check context of message
  if (botMentioned) {
    if (message.content.includes("?")) {
      message.reply("That's a good question! Let me think about it...");
    }
    const greeting = ["hi", "hello", "hey"];
    for (const greet of greeting) {
      if (message.content.includes(greet)) {
        message.reply(`Hi, ${message.author}, how can I help you?`);
      }
    }
  }

  // Remove the prefix or mention from the message content
  const command = botMentioned
    ? message.content.slice(client.user.id.length + 4).trim()
    : message.content.slice(prefix.length).trim();

  console.log(`command passed: ${command}`);

  const isSpaceSeparatedCommand = command.includes(" ");
  if (isSpaceSeparatedCommand) {
    const [commandName, ...commandArgs] = command.split(" ");
    if (commandName in commandsList) {
      commandLog.push(message.content);
      commandsList[commandName](message, commandArgs.join(" "));
    }
  } else {
    if (command in commandsList) {
      commandLog.push(message.content);
      commandsList[command](message);
    }
  }
});

client.login(process.env.TOKEN);
