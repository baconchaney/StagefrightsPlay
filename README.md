# Stagefright's Play V1.0 - A Discord bot to help run the encounter from The Wild Beyond The Witchlight.

## About the project
I am currently running The Wild Beyond The Witchlight D&D campaign for my players and have always played online using various tools. I noticed that Stagefright's Play as written in the module required players to draw lines out of a hat to speak and are scored on how successful they are during this encounter. As we use Discord this wasn't really an option and I struggled to find an existing alternative without changing the virtual table top software that we are using (Talespire which is amazing) so figured I would create a Discord bot to help facilitate this.

## How to use
### Getting started
To get started you can invite the bot to your server using:
https://discord.com/api/oauth2/authorize?client_id=1039624784700526652&permissions=311385339968&scope=bot
** Please be aware** I have used the bot successfully to run the encounter on my server. However, I am currently waiting on feedback from other users to ensure it runs properly in different environments. The bot will change over time as I tidy up the commands based on feedback.

### Slash Commands
`/start` - Simply starts the encounter. A message from the bot will appear in the text channel you send the command from with a message from Stagefright and a button that users can click to receive a random line. Each line is deleted from the database as it is drawn so duplicates are never shown. Once all the lines have been drawn, the bot will respond with > "**Stagefright shout's** Well done!".

`/adddata` - Followed by a string field you can add your own lines into the database.

`/getalldata` - Yet to be fully implemented. Idea is to get a non-destructive output of all lines currently in the database.

`/getdata` - Followed by a string field. **Superseded by /start**

`/getrandomline` - Will ask for two optional fields, the channel you would like it to be sent to (the bot requires permission to send into the channel) and a user you would like it to target in the reply.

`/importdata` - Will be removed. Implementation is currently used to reset the database to hold all 80 lines by re-importing it and will not work outside of the development environment.

`/restoreall` - Designed to restore all entries in the table that have been "deleted" (all entries are soft deleted to remove the requirement to keep re-importing data). Deployment of the command was not as clean as I would have liked due to deploying to an AWS EC2 instance at the same time to allow external testing to take place. Dependencies are now resolved and the command functions as expected. 

## Additional considerations
I'm currently running some external testing with other Discord users to help highlight any potential issues that need addressing. After some consideration when migrating the code to an external host it looks as though I might need to create a separate table to allow for each server to have it's own instance as well as the ability to add in their own phrases.
