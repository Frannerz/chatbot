require('dotenv').config();
const { Client, IntentsBitField, Collection, Events, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const prefix = '!';

const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
        GatewayIntentBits.Guilds,
    ]
})

client.once('ready', (c)=>{
    console.log(`${c.user.tag} is online!`);
})

//sends basic greeting
client.on('messageCreate', (message)=>{
    console.log(message.content);
    if(message.author.bot){
        return;
    }
    if(message.content === 'hello'){
        message.reply('Hey! How can I help?')
    }
})

//command handler
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}


// const foldersPath = path.join(__dirname, 'commands');
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
// 	const commandsPath = path.join(foldersPath, folder);
// 	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// 	for (const file of commandFiles) {
// 		const filePath = path.join(commandsPath, file);
// 		const command = require(filePath);
// 		// Set a new item in the Collection with the key as the command name and the value as the exported module
// 		if ('data' in command && 'execute' in command) {
// 			client.commands.set(command.data.name, command);
// 		} else {
// 			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 		}
// 	}
// }

//receiving command interactions:
// client.on(Events.InteractionCreate, interaction => {
// 	if (!interaction.isChatInputCommand()) return;
// 	console.log(interaction);
// });

// // Ignore messages from bot or that don't start with prefix
// client.on('message', ()=>{
//     if(message.author.bot || !message.content.startsWith(prefix)){
//         return;
//     }
// })




client.login(process.env.TOKEN)