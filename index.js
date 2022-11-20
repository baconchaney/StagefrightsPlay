// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const contents = require('./sql-setup.js')
const { Client, Events, ActivityType, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [395137124352] });
client.commands = new Collection();

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, () => {
	client.user.setUsername('Stagefright');
	client.user.setActivity('Performances in MotherHorn', { type: ActivityType.Watching });
	contents.sync();
	console.log(`Logged in as ${client.user.username}!`);
});

const commandsPath = path.join(__dirname, 'slash_commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

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