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
    if (msg.author.bot) {
        return;
    }
    const splitCommand = msg.content.split(" ");
    if (splitCommand[0].toLowerCase() === "/gb") {
        const content = splitCommand.splice(1,splitCommand.length).join(" ");
        const args = stringArgv(content);
        const argv = minimist(args, {
            alias: {
                'c': 'channel',
                'u': 'user',
                'h': 'help'
            },
            string: ['c']
        });

        let command = argv._[0];
        if (command) {
            command = command.toLowerCase();
        }

        //Dynamic Voice commands
        fs.readdir('./media/audio/', (err, files) => {
            for (const file of files) {
                if (new RegExp(`${command}\..*`).test(file)) {
                    clientHandlers.deleteMessage(msg);
                    return clientHandlers.playFile(msg, file, .6, argv.channel, argv.user);
                }
            }
        });

        //Other commands
        if (command === 'help' || argv.help) {
            clientHandlers.helpMessage(msg);
        }
        if (command === 'voiceoptions') {
            clientHandlers.voiceOptions(msg);
        }
        if (command === 'bot') {
            clientHandlers.makeBotInvite(msg);
        }
        if (command === 'conspiracy') {
            clientHandlers.conspiracy(msg, argv.channel, argv.user);
        }
    } else {
        if (msg.content === 'who is a baby boy?') {
            clientHandlers.babyBoy(msg);
        } 
    }
});

client.login(process.env.LOGIN_TOKEN);