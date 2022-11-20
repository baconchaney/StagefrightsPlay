const { SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');
const contents = require('../sql-setup.js')

module.exports = {
    data: new SlashCommandBuilder()
		.setName('getdata')
		.setDescription('Get data from database')
        .addStringOption(option =>
			option.setName('name')
				.setDescription('The data to retrieve')
                .setAutocomplete(true)
				.setRequired(true))
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
        const tagName = interaction.options.getString('name');

        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
        const tag = await contents.data.findOne({ where: { textString: tagName } });

        if (tag) {
            // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';

            return interaction.reply(tag.get('textString'));
        }

        return interaction.reply(`Could not find tag: ${tagName}`);

        },
};