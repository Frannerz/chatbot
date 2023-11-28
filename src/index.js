require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent
    ]
})

client.once('ready', (c)=>{
    console.log(`${c.user.tag} is online!`);
})

client.on('messageCreate', (message)=>{
    console.log(message.content);
    if(message.author.bot){
        return;
    }
    if(message.content === 'hello'){
        message.reply('Hey! How can I help?')
    }
})

client.login(process.env.TOKEN)