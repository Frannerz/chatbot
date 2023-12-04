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

const mentionsLog = [];

client.once("ready", (c) => {
  console.log(`${c.user.tag} is online!`);
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
 
  const command = message.content.slice(1);

  

  //console.log(command);

  if (command in commandsList) {
    commandsList[command](message);
  }

});

client.login(process.env.TOKEN);
