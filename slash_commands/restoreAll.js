const { SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');
const contents = require('../sql-setup.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('restoreall')
		.setDescription('Get all data from database')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		serverId = interaction.guildId
		try{
			const restoredTags = await contents.data.restore({
				where:{
					deletedAt: {
						[contents.Op.ne]:0,
					},
					guildId: serverId,
				}
			});
		} catch(error){
			console.log(error);
		}

		return interaction.reply(`Restored!`);

	},
};