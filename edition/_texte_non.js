const fs = require('fs');

module.exports = (message, namel) => {
    let pos = Number(namel.replace("etape ", ""));
    let filter = m => (m.content.startsWith("#"));
    let filePath = (`./guilds/${message.channel.guild.name}/fail/`);
    let data = JSON.parse(fs.readFileSync(`./guilds/${message.channel.guild.name}/${message.channel.guild.name}.json`));

    if (namel === 'etape 0') {
        return message.channel.send(`Ceci est l'étape de départ, elle ne peut pas avoir de texte d'échec`);
    }
    if (data.answers.hasOwnProperty(namel)) {
        message.channel.send(
`Vous pouvez entrer ici différentes réponses en cas d'échec à l'étape, le bot renverra l'une d'elles au hasard
Entrez simplement '#' avant chanque réponse. **exemple**: \`\`\`#réponse1 #réponse2 #réponse3 etc\`\`\`
Si vous souhaitez intégrer des blocs comme ci-dessus assurez vous d'ajouter un \\ avant chaque \``
        )
        .then(() => {
            message.channel.awaitMessages(filter, {max: 1})
            .then((e) => {
                let arr = [];

                try {
                    arr = e.first().content.split("#");
                }
                catch(err) {
                    console.log(err);
                    message.channel.send(`Erreur de format. Vérifiez le préfixe.`);
                }

                arr.splice(0, 1);
                message.channel.send(`Voici les différentes réponses au joueur : ${arr}`);

                fs.writeFile((filePath + pos +'.js'), ("module.exports = " + JSON.stringify(arr)), (err) => {
                    if (err) {
                        fs.mkdirSync(filePath);
                        fs.writeFile((filePath + pos +'.js'), ("module.exports = " + JSON.stringify(arr)), (err) => {
                            if (err) {
                                console.log(err);
                                return message.channel.send(`Error`);
                            }
                        });
                    }
                });
            })
            .catch(function(error) {
                message.channel.send(`Temps écoulé ou format non reconnu.`);
                console.log(error);
                return;
            })
        })
    } else {
        return (message.channel.send(`La typo de l'étape semble erronée, ou l'étape en question n'existe pas.`));
    }
}
