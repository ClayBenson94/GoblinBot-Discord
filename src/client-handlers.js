const path = require('path');
const client = global.client;
const userIds = {
    PiercingGoblin: '179307528079802369',
    Gamervixen89: '113071920030679040'
};

function babyBoy(msg) {
    if (msg.author.id !== '179307528079802369') {
        msg.reply(`<@${userIds.PiercingGoblin}> is a baby boy!`);
    } else {
        msg.reply('you are a baby boy!');
    }
}

function makeBotInvite(msg) {
    client.generateInvite(['ADMINISTRATOR']).then((inv) => {
        msg.reply(inv);
    });
}

function helpMessage(msg) {
    msg.member.createDM().then((dm) => {
        dm.send(`
Usage: /gm [options] [command]
Options:

\t-h, --help: Display this help message
\t\t\`/gb help\`,\`/gb -h\`,\`/gb --help\`
\t-c <id>, --channel <id>: If using a voice command, the voice channel in which to play the command.
\t\t\`/gb -c 335877899863457793 babyboy\`
        `);
    });
}

function playFile(msg, fileName, volume = 1, deleteSourceMessage = true, channelToJoin) {
    if (deleteSourceMessage) {
        msg.delete()
            .catch((err) => {
                if (err.code === 50013) {
                    console.log('Failed to delete message. Check bot permissions');
                } else {
                    console.log(err);
                }
            });
    }

    let voiceChannel;
    if (channelToJoin) {
        voiceChannel = client.channels.get(channelToJoin);
        if (!voiceChannel) {
            msg.member.createDM().then((dm) => {
                dm.send(`You specified an invalid channel ID! ${channelToJoin} is not a valid channel!`);
            });
        }
    } else if (msg.member && msg.member.voiceChannel) {
        voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) {
            msg.member.createDM().then((dm) => {
                dm.send('You must be in a voice hannel in order to use voice commands!');
            });
        }
    }

    if (voiceChannel) {
        voiceChannel.join()
            .then(connection => {
                const dispatcher = connection.playFile(path.resolve(`./media/audio/${fileName}`));
                dispatcher.setVolume(volume);
                dispatcher.on('end', () => {
                    voiceChannel.leave();
                });
            })
            .catch(console.log);
    }
}

module.exports = {
    babyBoy,
    makeBotInvite,
    helpMessage,
    playFile
};