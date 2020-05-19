const fs = require ('fs');

module.exports = (message) => {
    let file = `./guilds/${message.channel.guild.name}/${message.channel.guild.name}.json`;

    message.channel.send(
`***Bienvenue dans l'assistant d'édition. Tous vos messages doivent être précédés du signe "#".***
*Assurez vous d'utiliser un salon discord privé afin de ne pas rendre les réponses publiques.*
***Veuillez entrer le nombre d'étapes prévues pour votre jeu, précédé par "#". (le nombre d'étapes correspond au nombre de codes à trouver)***`
    )
    .then(() => {
        let filter = m => (m.content.startsWith("#"));
        let data = {"answers": {"etape 0": {}}, "etapes": 0, "start": "!start" };

        try {
            fs.mkdirSync(`./guilds/${message.channel.guild.name}`);
        }
        catch(err) {
            console.log(err);
        }

        message.channel.awaitMessages(filter, {max: 1})
        .then((e) => {
            data.etapes = Number(e.first().content.replace("#",""));

            if (isNaN(data.etapes)) {
                return (message.channel.send(`Erreur dans la déclaration. Réessayez.`));
            }

            message.channel.send(`Souhaitez vous confimer ${data.etapes} étapes ? #oui / #non`)
            .then(() => {
                message.channel.awaitMessages(filter, {max: 1, time: 60000, error: ['time']})
                .then((f) => {
                    rep = f.last().content.replace("#","").toLowerCase();
                    if (rep === 'oui') {
                        let etp = '';
                        for (i = 1; i <= data.etapes; i++) {
                            etp = `Etape ${i}`;
                            data.answers[etp.toLowerCase()] = {};
                            message.channel.guild.roles.create({
                                data:{
                                    name: etp,
                                    hoist: true,
                                    color: 'WHITE'
                                }
                            });
                        }
                        data.answers.final = `Explorateurs`;
                        if (message.channel.guild.roles.cache.find(role => role.name === data.answers.final) === undefined) {
                            message.channel.guild.roles.create({
                                data:{
                                    name: data.answers.final,
                                    hoist: true, 
                                    color: 'GOLD'
                                }
                            });
                        }
                        fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                        });
                        message.channel.send(
`${data.etapes} étapes ont été créées !
Vous pouvez maintenant éditer les étapes.
***Attention, Toutes ces données sont modifiables à tout moment. Soyez certain de vos actions une fois le jeu lancé !***
N'hésitez pas à épingler ce message. `,
                            {embed: require('../edition/commandslist.js')}
                        );
                    } else {
                        return message.channel.send(`Abandon de l'édition, aucun changement n'a été pris en compte`);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    message.channel.send(`Abandon de l'édition, aucun changement n'a été pris en compte`);
                });
            })
            .catch((error) => {
                console.log(error);
                if (error) return;
            });
        })
        .catch((error) => {
            console.log(error);
            message.channel.send(`Erreur dans la déclaration. Réessayez.`);
        });
    })
}
