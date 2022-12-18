// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const dbContents = require('./sql-setup.js')
const { Client, Events, ActivityType, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	395137124352
]});
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'slash_commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const internalCommandsPath = path.join(__dirname, 'internal_slash_commands');
const internalCommandFiles = fs.readdirSync(internalCommandsPath).filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

for (const file of internalCommandFiles) {
	const filePath = path.join(internalCommandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, () => {
	client.user.setUsername('Stagefright');
	client.user.setActivity('Performances in MotherHorn', { type: ActivityType.Watching });
	dbContents.sync();
	console.log(`Logged in as ${client.user.username}!`);
});

client.on(Events.GuildCreate, async guild => {
	const importData = require('./internal_commands/guild-create.js');
	try {
		await importData.execute(guild, client);
	} catch(error) {
		console.error(error);
	}
	return;
});

client.on(Events.GuildDelete, async guild => {
	console.log('removing from server');
	const destroyData = require('./internal_commands/guild-delete.js');
	try {
		await destroyData.execute(guild);
	} catch(error) {
		console.error(error);
	}
	return;
});

client.on(Events.InteractionCreate, async interaction => {
	let command = false;
	if (interaction.isChatInputCommand()) {
		command = interaction.client.commands.get(interaction.commandName);
	} else if (interaction.isButton()){
	
		const button = require('./button_commands/buttonHandler.js');

		try {
			await button.execute(interaction);
		} catch(error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing the button script !', ephemeral: true});
		}
		return;
	}
	else { return; }
	
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!'});
	}
});

// Log in to Discord with your client's token
client.login(token);