const { SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');
const contents = require('../sql-setup.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('getalldata')
		.setDescription('Get all data from database')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const tagList = await contents.data.findAll({ attributes: ['textString'] });
		const tagString = tagList.map(t => t.textString).join('\n ') || 'No tags set.';

		return interaction.reply(`List of tags:\n ${tagString}`);

	},
};