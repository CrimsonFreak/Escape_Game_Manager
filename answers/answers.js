const fs = require('fs');
const { MessageAttachment } = require('discord.js');

module.exports = (message, main) => {
    let playerData = JSON.parse(fs.readFileSync('./players.json'));
    let Serv = main.guilds.cache.find(s => s.name === (playerData[message.author.id][playerData[message.author.id].length - 1]));
    if (Serv === null) {
        return message.reply(`Vous n'êtes pas enregistré dans ce serveur. Tapez la commande de départ pour vous enregistrer`);
    }

    let dude = Serv.member(message.author);
    let dudeRole = [];
    let msg = message.content.toLowerCase();
    let ans = JSON.parse(fs.readFileSync(`./guilds/${Serv.name}/${Serv.name}.json`, (err) => {
        if (err) return console.log(err);
    }));

    for (i = 1; i <= ans.etapes; i++) {
        let r = dude.roles.cache.find(s => s.name === `Etape ${i}`);
        dudeRole.push(r === undefined);
    }
    dudeRole.push(true);
    let pos = dudeRole.indexOf(true);
    if (pos === 0) {
        return message.reply(`Tapez !start dans le channel général pour commencer à jouer.`);
    }

    let suc = '';
    let fail = '';

    try {
        fail = require(`../guilds/${Serv.name}/fail/${pos}`);
    }
    catch(err) {
        message.channel.send(`Erreur de chargement des fichiers. Parlez en au MJ`);
    }
    try {
        suc = require (`../guilds/${Serv.name}/success/${pos}`);
    }
    catch(err) {
        message.channel.send(`Erreur de chargement des fichiers. Parlez en au MJ`);
    }
    
    let rand = fail[Math.floor(Math.random() * fail.length)];

    function attchk() {
        if (ans.answers[`etape ${pos}`].hasOwnProperty('file')) {
            let att = new MessageAttachment(ans.answers[`etape ${pos}`].file);
            message.reply(suc, att);
        } else {
            message.reply(suc);
        }
    }
    function roleup(rolename) {
        dude.roles.add(Serv.roles.cache.find(r => r.name === rolename));
    }

    if (pos === ans.etapes & ans.answers[`etape ${pos}`].code.includes(msg.toLowerCase())) {
        message.react(`✔`);
        attchk();
        roleup(ans.answers.final);
        return;
    } else if (ans.answers[`etape ${pos}`].code.includes(msg)) {
        message.react(`✔`);
        attchk();
        roleup(`Etape ${pos + 1}`);
        return;
    } else if (dude.roles.cache.find(r => r.name === ans.answers.final) !== undefined) {
        console.log(ans.answers.final);
        return message.reply(`Vous avez terminé ! Crédits à venir...`);
    } else {
        message.react(`❌`);
        return message.reply(rand);
    }
}
