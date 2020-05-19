let fs = require('fs');
const {MessageEmbed} = require('discord.js');
let embed = {};

module.exports = (message, namel) => {
    let num = Number(namel.replace("etape ", ""));
    let path = `./guilds/${message.channel.guild}`;
    let raw = JSON.parse(fs.readFileSync(`${path}/${message.channel.guild}.json`));

    let code = `Vide`;
    let suc  = `Vide`;
    let fail = `Vide`;
    let att  = `https://i.imgur.com/QMutsdY.png`;

    if (raw.answers[namel].hasOwnProperty('code')) {
        code = raw.answers[namel].code;
    }
    if (raw.answers[namel].hasOwnProperty('file')) {
        att = raw.answers[namel].file;
    }

    try {
        suc = require(`.${path}/success/${num}.js`);
    }
    catch(err) {}

    try {
        fail = require(`.${path}/fail/${num}.js`);
    }
    catch(err) {}

    if (num === 0) {
        message.channel.send({embed: (embed = new MessageEmbed()
            .setTitle(`Etape 0`)
            .setDescription(suc)
            .setImage(att))
        });
        return;
    } else {
        message.channel.send({embed: (embed = new MessageEmbed()
            .setTitle(namel.toUpperCase())
            .setDescription(suc)
            .addField(`CODE`, code)
            .addField(`TEXTE D'ECHEC`, fail)
            .setImage(att))
        });
        return;
    }
}
