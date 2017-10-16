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

module.exports = {
    babyBoy,
    deleteMessage
};