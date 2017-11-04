const client = global.client;
const fs = require('fs');
const _ = require('lodash');
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
    msg.author.createDM().then((dm) => {
        dm.send(`
Usage: /gb [options] [command]
Options:

\t-h, --help: Display this help message
\t\t\`/gb help\`,\`/gb -h\`,\`/gb --help\`
\t-c <id>, --channel <id>: If using a voice command, the voice channel in which to play the audio.
\t\t\`/gb -c 335877899863457793 babyboy\`
\t-u <name|id>, --user <name|id>: If using a voice command, the user to find & play the audio for.
\t\t\`/gb -u PiercingGoblin babyboy\`
`);
    });
}

function sendDmToAuthor(author, text) {
    return author.createDM()
        .then((dm) => {
            dm.send(text);
        })
        .catch((err) => {
            console.log(`Failed to send message "${text}"`);
            console.log(err);
        });
}

function deleteMessage(msg) {
    if (msg.member) {
        msg.delete()
            .catch((err) => {
                console.log('Failed to delete message. Check bot permissions');
                console.log(err);
            });
    }
}

function playFile(msg, fileName, volume = 1, channelToJoin, userToFind) {
    let voiceChannel;
    if (channelToJoin) {
        voiceChannel = client.channels.get(channelToJoin);
        if (!voiceChannel) {
            return sendDmToAuthor(msg.author, `You specified an invalid channel ID! ${channelToJoin} is not a valid channel!`);
        }
    } else if (userToFind) {
        voiceChannel = client.channels.find((channel) => {
            return channel.type === 'voice' && channel.members.some((member) => {
                return member.displayName.toLowerCase() === userToFind.toLowerCase() || member.id === userToFind;
            });
        });
    } else {
        voiceChannel = msg.client.channels.find((channel) => {
            return channel.type === 'voice' && channel.members.some((member) => {
                return member.id === msg.author.id;
            });
        });
        if (!voiceChannel) {
            return sendDmToAuthor(msg.author, `You must be in a voice channel in order to use voice commands, or specify a channel ID to use with \`/gb -c <id> <command>\``);
        }
    }

    return voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playFile(`./media/audio/${fileName}`);
            dispatcher.setVolume(volume);
            dispatcher.on('end', () => {
                voiceChannel.leave();
            });
        })
        .catch((err) => {
            console.log('Failed to join and play audio file');
            console.log(err);
        });
}

function conspiracy(msg, channelToJoin, userToFind) {
    fs.readdir('./media/audio/conspiracy', (err, files) => {
        deleteMessage(msg);
        playFile(msg, `conspiracy/${_.sample(files)}`, 1, channelToJoin, userToFind);
    });
}

module.exports = {
    babyBoy,
    makeBotInvite,
    helpMessage,
    playFile,
    deleteMessage,
    conspiracy
};