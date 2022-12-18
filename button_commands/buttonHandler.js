const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ChannelType, userMention, bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('discord.js');
const contents = require('../sql-setup.js');

module.exports = {
    data: '',
    async execute(interaction) {
        if (interaction.customId === 'stagefrightLine') {
            
            let user = interaction.user.id;
            const client = interaction.client;
            const guild = interaction.guildId;
            let channel = interaction.channel;

            const tag = await contents.data.findOne({ 
                order: [contents.sequelize.random({
                    where: {
                        guildId: [null,guild]     
                    }
                })]
            });

            try {
                if (!tag) {
                    const introText = bold('Stagefright shouts')
                    const textString = `${introText} Well done!`;
                    return interaction.reply(textString);
                } else {
                    const introText = (user)? `${bold('Stagefright whispers to')} ${userMention(user)}` : bold('Stagefright whispers') ;
                    const randomString = italic(tag.get('textString'));
                    const textString = `${introText} ${randomString}`;
                    const rowCount = await contents.data.destroy({ where: { id: tag.get('id') } });
                    const row = new ActionRowBuilder()
                    .setComponents(
                        new ButtonBuilder()
                            .setCustomId('complete')
                            .setLabel('Spoken!')
                            .setStyle(ButtonStyle.Success),
                    );
                    //console.log(client);
                    //console.log(interaction);
                    //const m = await interaction.message.delete();
                    //return client.channels.cache.get(channel).send({content: textString, components: [row] });
                    //return interaction.reply({content: textString, components: [row] });
                    //return interaction.reply({content: textString});
                    //if(channel) {
                        //return client.channels.cache.get(channel).send(textString);
                    //} else {
                        return interaction.reply(textString);
                    //}
                }
            } 
            catch(error){
                console.log(error);
            }
            
        } else if (interaction.customId === 'complete') {
            console.log(interaction);
            return interaction.deleteReply();
        }
    }
};