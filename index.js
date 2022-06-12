// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const deepai = require('deepai');
const { apiKey } = require('./config.json');

deepai.setApiKey(apiKey);

// Create a new client instance
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\nCreated: ${interaction.guild.createdAt}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});


//if the bot is mentioned at the beggining of the message, it will generate a response to the message
client.on("messageCreate", async message => {
	if (message.content.startsWith("<@985130630067159070>")) {
		let resp = await deepai.callStandardApi("text-generator", {
			text: message.content.slice(22),
		});
		let shortResponses = resp.output.split("\n");
        await message.channel.send(shortResponses[0]);
	}        
    
});

client.login(token);