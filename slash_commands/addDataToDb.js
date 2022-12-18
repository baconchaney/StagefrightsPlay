const { SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');
const contents = require('../sql-setup.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('adddata')
		.setDescription('Send data to database')
		.addStringOption(option =>
			option
				.setName('title')
				.setDescription('The data to save')
				.setRequired(true))
				.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const tagDescription = interaction.options.getString('title');

        try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const entry = await contents.data.create({
				textString: tagDescription,
				username: interaction.user.username,
				guildId: interaction.guildId,
			});

			return interaction.reply(`Tag ${entry.textString} added.`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('That tag already exists.');
			}
				
			return interaction.reply('Something went wrong with adding a tag. ' + error);
		}

	},
};