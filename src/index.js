require("dotenv").config();
const { Client, IntentsBitField, GatewayIntentBits } = require("discord.js");
const { commandsList } = require("./commands");

const prefix = "!";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
    GatewayIntentBits.Guilds,
  ],
});

client.once("ready", (c) => {
  console.log(`${c.user.tag} is online!`);
});

client.on("messageCreate", (message) => {
  //console.log(message);

  // check if the bot has been mentioned and set botMentioned variable to true or false
  const botMentioned = message.mentions.has(client.user.id);
  console.log(`Bot mentioned: ${botMentioned}`);

  if (
    message.author.bot ||
    (!message.content.startsWith(prefix) && !botMentioned)
  ) {
    console.log("message ignored!");
    return;
  }

  // Remove the prefix or mention from the message content
  const command = botMentioned
    ? message.content.slice(client.user.id.length + 4).trim()
    : message.content.slice(prefix.length).trim();

  console.log(`command passed: ${command}`);

  if (command in commandsList) {
    commandsList[command](message);
  }
});

client.login(process.env.TOKEN);
