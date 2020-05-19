let fs = require('fs');
let answer = require('../answers/answers.js');
let edit = require('../edition/edit.js');
let { MessageAttachment } = require('discord.js');
let data = {};

module.exports = (message) => {
    if (message.author.bot) return;

    let pFile = JSON.parse(fs.readFileSync('./players.json'));
    let guildPath = `./guilds/${message.channel.guild}/${message.channel.guild}.json`;

    if (fs.existsSync(guildPath)) {
        data = JSON.parse(fs.readFileSync(guildPath));
    }

    function permchk(fct) {
        if (message.channel.permissionsFor(message.author).has(0x8)) {
            return fct;
        } else {
            return message.reply(`Vous ne semblez pas avoir les droits nécessaires pour éditer le jeu. Seuls les administrateurs le peuvent.`);
        }
    }

    if (message.channel.type === 'dm') {
        try {
            answer(message, module.parent.exports);
        }
        catch (err) {
            console.log(err);
            message.reply(`Erreur dans le jeu. Contactez l'administrateur.`);
        }
        return;
    }

    if (message.content === '!edit') {
        permchk(edit(message));
    }
    if (message.content === '!commandes') {
        permchk(message.channel.send({embed: require('../edition/commandslist.js')}));
    }
    if (message.content.toLowerCase().startsWith("#")) {
        permchk(require(`../edition/command.js`)(message));
    }

    if (message.content === data.start) {
        let suc = require(`../guilds/${message.channel.guild}/success/0.js`);

        message.reply(`Attention si vous commencez une partie sur ce serveur, vous ne pourrez pas continuer la partie sur les autres serveurs.`);
        var role = message.channel.guild.roles.cache.find(role => role.name === `Etape 1`);
        message.channel.guild.member(message.author).roles.add(role);

        if (pFile.hasOwnProperty(message.author.id)) {
            pFile[message.author.id].forEach(g => {
                if (g === message.channel.guild.name) return;
            })
            pFile[message.author.id].push(message.channel.guild.name);
        } else {
            pFile[message.author.id] = [message.channel.guild.name];
        }

        fs.writeFile('./players.json', JSON.stringify(pFile, null, 2), (err) => {
            if (err) {
                return console.log(err);
            }
        });

        if (data.answers[`etape 0`].file !== undefined) {
            let att = new MessageAttachment(data.answers[`etape 0`].file);
            message.author.createDM()
            .then((channel) => {
                channel.send(suc, att);
            });
        } else {
            message.author.createDM()
            .then((channel) => {
                channel.send(suc);
            });
        }
    }
}
