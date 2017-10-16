const userIds = {
    PiercingGoblin: '<@187698900843495424>'
};

function babyBoy(msg) {
    if (msg.author.id !== '179307528079802369') {
        msg.reply(`${userIds.PiercingGoblin} is a baby boy!`);
    } else {
        msg.reply('you are a baby boy!');
    }
}

function deleteMessage(msg) {
    msg.delete();
}

function join(msg) {
    if (msg.member.voiceChannel) {
        msg.member.voiceChannel.join()
            .then(connection => { // Connection is an instance of VoiceConnection
                const dispatcher = connection.playFile('../media/audio/vlad.ogx');
                dispatcher.on('end', () => {
                    msg.member.voiceChannel.leave();
                });
            })
            .catch(console.log);
    } else {
        msg.author.createDM().then((dm) => {
            dm.sendMessage('You must be in a voice channel!');
        });
    }
}

module.exports = {
    babyBoy,
    deleteMessage,
    join
};