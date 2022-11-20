const { SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');
const contents = require('../sql-setup.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('restoreall')
		.setDescription('Get all data from database')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const tagList = await contents.data.findAll();

		for(tag of tagList){
			const result = contents.data.restore({where:{id: tag.id}});
			console.log(result);
		}

		return interaction.reply(`Restored!`);

	},
};