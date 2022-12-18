const contents = require('../sql-setup.js')

module.exports = {
    data: '',
	async execute(guild) {
        serverId = guild.id;
        const tags = await contents.data.destroy({ 
            where: {
                guildId: [serverId],
            },
            force: true     
        })
	},
};