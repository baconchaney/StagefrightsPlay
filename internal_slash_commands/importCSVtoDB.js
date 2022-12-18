const { SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');
const contents = require('../sql-setup.js')
const fs = require('fs');
const csv = require('@fast-csv/parse');

// Only required for testing. Planning on automating on initialisation

module.exports = {
	data: new SlashCommandBuilder()
		.setName('importdata')
		.setDescription('Import CSV')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		fs.createReadStream('lines.csv')
        .pipe(csv.parse())
        .on('error', error => console.error(error))
        .on('data', row => {
            const tagDescription = String(row);
            const entry = contents.data.create({
				textString: tagDescription,
				username: interaction.user.username,
                guildId: interaction.guildId,
			});
        })
        .on('end',rowCount => {
            console.log(`Parsed ${rowCount} rows`);
            return interaction.reply(`Parsed ${rowCount} rows`);
        });
	},
};