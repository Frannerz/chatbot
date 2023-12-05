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
});

client.on("messageCreate", (message) => {

  if (message.mentions.has(client.user.id)) {
    const mentionInfo = {
      content: message.content,
      author: message.author.username,
      timestamp: new Date(),
      channel: message.channel.name,
    };

    mentionsLog.push(mentionInfo);
  }

  // check if the bot has been mentioned and set botMentioned variable to true or false
  const botMentioned = message.mentions.has(client.user.id)|| message.channel.type === 'DM';
  //console.log(`Bot mentioned: ${botMentioned}`);

  if (
    message.author.bot ||
    (!message.content.startsWith(prefix) && !botMentioned)
  ) {
    return;
  }

  //check context of message
  if(botMentioned) {
    if(message.content.includes('?') && !message.content.includes('!chat')) {
    message.reply("That's a good question! Try starting your question with !chat");
    } 

    const greeting = ["hi", "hello", "hey"];
    for (const greet of greeting) {
      if (message.content.includes(greet)) {
        message.reply(`Hi, ${message.author}, how can I help you?`);
      }
    }
  };

 
  // Remove the prefix or mention from the message content
  const command = botMentioned
   ? message.content.split(' ')[1].slice(prefix.length).trim()
   : message.content.split(' ')[0].slice(prefix.length).trim();
  //console.log(`command passed: ${command}`);

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
