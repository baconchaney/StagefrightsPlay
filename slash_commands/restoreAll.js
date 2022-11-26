const { SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');
const contents = require('../sql-setup.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('restoreall')
		.setDescription('Get all data from database')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const tagList = await contents.data.findAll();

		try{
			const restoredTags = await contents.data.restore({
				where:{
					deletedAt: {
						[Op.ne]:0,
					}
				}
			});
		} catch(error){
			console.log(error);
		}

		return interaction.reply(`Restored!`);

	},
};