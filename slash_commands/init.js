const { SlashCommandBuilder,PermissionFlagsBits, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Lets start the show!')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
        const row = new ActionRowBuilder()
			.setComponents(
				new ButtonBuilder()
					.setCustomId('stagefrightLine')
					.setLabel('Line!')
					.setStyle(ButtonStyle.Primary),
			);

		interaction.reply({ content: 'It\'s time for the show to start!', components: [row] });
        }
};