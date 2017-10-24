const Discord = require("discord.js");
const client = global.client = new Discord.Client();
const clientHandlers = require('./client-handlers');
const minimist = require('minimist');
const stringArgv = require('string-argv');
const fs = require('fs');

require('dotenv').config();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const splitCommand = msg.content.split(" ");
    if (splitCommand[0].toLowerCase() === "/gb") {
        const content = splitCommand.splice(1,splitCommand.length).join(" ");
        const args = stringArgv(content);
        const argv = minimist(args, {
            alias: {
                'c': 'channel',
                'h': 'help'
            },
            string: ['c']
        });

        const command = argv._[0];


        //Voice commands
        fs.readdir('./media/audio/', (err, files) => {
            for (const file of files) {
                if (new RegExp(`${command}\..*`).test(file)) {
                    return clientHandlers.playFile(msg, file, .6, true, argv.channel);
                }
            }
        });

        //Other commands
        if (command === 'help' || argv.help) {
            clientHandlers.helpMessage(msg);
        }
        if (command === 'bot') {
            clientHandlers.makeBotInvite(msg);
        }
    } else {
        if (msg.content === 'who is a baby boy?') {
            clientHandlers.babyBoy(msg);
        } 
    }
});

client.login(process.env.LOGIN_TOKEN);