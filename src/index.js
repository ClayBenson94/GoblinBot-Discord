const Discord = require("discord.js");
const client = new Discord.Client();
const clientHandlers = require('./client-handlers');

require('dotenv').config();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'who is a baby boy?') {
        clientHandlers.babyBoy(msg);
    } 
    if (msg.content === 'delete') {
        clientHandlers.deleteMessage(msg);
    }
    if (msg.content === '/join') {
        clientHandlers.join(msg);
    }
});

client.login(process.env.LOGIN_TOKEN);