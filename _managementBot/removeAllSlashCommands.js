const { REST, Routes } = require('discord.js');
require("dotenv").config();
const token = process.env.TOKEN;
const clientID = process.env.CLIENT_ID;

const rest = new REST({ version: '10' }).setToken(token);

// // for guild-based commands
// rest.put(Routes.applicationGuildCommands(clientID, guildId), { body: [] })
// 	.then(() => console.log('Successfully deleted all guild commands.'))
// 	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(clientID), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);