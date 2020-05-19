const fs = require('fs');
let ack = ['yes !', 'OK !', 'ça roule !', 'done !', 'oui chef !', 'et voilà le travail !'];

module.exports = (message, namel) => {
    let filter = m => (m.content.startsWith("#"));
    let file   = './guilds/' + message.channel.guild.name + '/' + message.channel.guild.name + '.json';
    let data   = JSON.parse(fs.readFileSync(file));

    if (data.answers.hasOwnProperty(namel)) {
        message.channel.send(`Pour utiliser au mieux cette fonction, utilisez un lien direct **imgur**. N'oubliez pas "#" au début`)
        .then(() => {
            message.channel.awaitMessages(filter, {max: 1})
            .then((e) => {
                data.answers[namel].file = e.first().content.replace("#","");
                message.channel.send(ack[Math.floor(Math.random() * ack.length)]);

                fs.writeFile(file, JSON.stringify(data, null, 2), (error) => {
                    if (error) {
                        return console.log(error);
                    }
                });
            })
            .catch(function(error) {
                console.log(error);
                message.channel.send(`Erreur ou temps écoulé, vérifiez la typo et la présence du "#"`);
            });
        });
    }
}
