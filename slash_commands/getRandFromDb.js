const { SlashCommandBuilder,PermissionFlagsBits, ChannelType, userMention, bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('discord.js');
const contents = require('../sql-setup.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('getrandomline')
		.setDescription('Get random entry from the database')
        .addChannelOption(option =>
            option.addChannelTypes(ChannelType.GuildText).setName('channel')
                .setDescription('The channel to echo into'))
        .addUserOption(option =>
            option.setName('user')
            .setDescription('who would you like it to be sent to?'))
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
        let user = (interaction.options.get('user')) ? interaction.options.get('user').value : '';
        let channel = (interaction.options.get('channel')) ? interaction.options.get('channel').value : '';
        const client = interaction.client;

        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
        const tag = await contents.data.findOne({ order: [contents.sequelize.random()]});

        if (tag) {
            let introText = (user)? `${bold('Stagefright whispers to')} ${userMention(user)}` : bold('Stagefright whispers') ;
            const randomString = italic(tag.get('textString'));
            const textString = `${introText} ${randomString}`;
            const rowCount = await contents.data.destroy({ where: { id: tag.get('id') } });
            if(channel) {
                return client.channels.cache.get(channel).send(textString);
            } else {
                return interaction.reply(textString);
            }
        }

        return interaction.reply(`Could not find any entries.`);

        },
};