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
  if (message.author.bot || !message.content.startsWith(prefix)) {
    return;
  }
 
  const command = message.content.slice(1);
  //console.log(command);

  if (command in commandsList) {
    commandsList[command](message);
  }
});

client.login(process.env.TOKEN);
