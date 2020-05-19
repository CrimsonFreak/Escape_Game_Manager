const fs = require('fs');
let ack = ['yes !', 'OK !', 'ça roule !', 'done !', 'oui chef !', 'et voilà le travail !'];

module.exports = (message) => {
    const path = `./guilds/${message.channel.guild}/${message.channel.guild}.json`;
    const data = JSON.parse(fs.readFileSync(path));

    message.channel.send(`Entrez "#" puis la commande que les joueurs devront entrer pour commencer à jouer (*!start par défaut*). Exemple : #!start`)
    .then(() => {
        let filter = m => (m.content.startsWith("#"));

        message.channel.awaitMessages(filter, {max: 1})
        .then ((a) => {
            data.start = a.first().content.replace("#","");

            fs.writeFile(path,(JSON.stringify(data, null, 2)), (err) => {
                if (err) {
                    return console.log(err);
                }
            });

            message.channel.send(ack[Math.floor(Math.random() * ack.length)]);
        })
        .catch((error) => {
            return console.log(error);
        });
    });
}
