const contents = require('../sql-setup.js')
const fs = require('fs');
const csv = require('@fast-csv/parse');

module.exports = {
    data: '',
	async execute(guild, client) {
        serverId = guild.id;
        user = client.user.username;

        const tag = await contents.data.findOne({ 
            where: { 
                guildId: serverId 
            } 
        });
        if (tag) {
            console.log("preset data already present");
            return;
        }

		fs.createReadStream('lines.csv')
        .pipe(csv.parse())
        .on('error', error => console.error(error))
        .on('data', row => {
            const tagDescription = String(row);
            const entry = contents.data.create({
				textString: tagDescription,
				username: user,
                guildId: serverId,
			});
        })
        .on('end',rowCount => {
            console.log(`Parsed ${rowCount} rows`);
            try{
            const welcomeChannel = guild.channels.cache.filter(c => c.type == 'text').find(x => x.position === 0);
            welcomeChannel.send(`Parsed ${rowCount} rows`);
            } catch(error) {
                console.log(error);
            }
            return;
        });
	},
};