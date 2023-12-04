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

  //check context of message
  if(botMentioned) {
    if(message.content.includes('?')) {
    message.reply("That's a good question! Let me think about it...");
    } 
    const greeting = ["hi", "hello", "hey"];
    for(const greet of greeting){
      if(message.content.includes(greet)){
        message.reply(`Hi, ${message.author}, how can I help you?`);
      }
    }
  };


  // Remove the prefix or mention from the message content
  const command = botMentioned
    ? message.content.slice(client.user.id.length + 4).trim()
    : message.content.slice(prefix.length).trim();

  console.log(`command passed: ${command}`);

  if (command in commandsList) {
    commandLog.push(message.content);
    commandsList[command](message);
  }
});


client.login(process.env.TOKEN);

