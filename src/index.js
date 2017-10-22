const Discord = require("discord.js");
const client = global.client = new Discord.Client();
const clientHandlers = require('./client-handlers');

require('dotenv').config();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const splitCommand = msg.content.split(" ");
    if (splitCommand[0].toLowerCase() === "/gb") {
        const content = splitCommand.splice(1,splitCommand.length).join(" ");
        
        if (content === 'babyboy') {
            clientHandlers.playFile(msg, 'babyboy.wav', .6, true);
        }
        if (content === '4d3d3d3') {
            clientHandlers.playFile(msg, '4d3d3d3.wav', .6);
        }
        if (content === 'bot') {
            clientHandlers.makeBotInvite(msg);
        }
    } else {
        if (msg.content === 'who is a baby boy?') {
            clientHandlers.babyBoy(msg);
        } 
    }
});

client.login(process.env.LOGIN_TOKEN);