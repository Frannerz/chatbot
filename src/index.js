require("dotenv").config();
const { Client, IntentsBitField, GatewayIntentBits } = require("discord.js");
const { commandsList, commandLog } = require("./commands");

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

//const channel = client.channels.cache.get(process.env.CHANNEL);

client.once("ready", (c) => {
  console.log(`${c.user.tag} is online!`);
//   if (channel) {
//     channel.send(`${c.user.tag} is online! Type !help to view possible commands.`);
//   } else {
//     console.error('Text channel not found.')
//   }
});

client.on("messageCreate", (message) => {
  console.log(message.content);
  if (message.author.bot || !message.content.startsWith(prefix)) {
    return;
  }

  const command = message.content.slice(1);
  //console.log(command);
  
  if (command in commandsList) {
    commandLog.push(message.content);
    commandsList[command](message);
  }
});


client.login(process.env.TOKEN);

