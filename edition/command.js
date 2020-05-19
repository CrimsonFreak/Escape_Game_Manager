const fs = require ('fs');

module.exports = (message) => {
    let ffs = message.content.toLowerCase().replace('#','');

    if (message.content.toLowerCase().startsWith("#etape")) {
        let name = message.content.split(':')[0].replace("#","");
        let namel = name.toLowerCase();

        try {
            require(`../edition/_${message.content.toLowerCase().slice(message.content.indexOf(':') + 2)}.js`)(message, namel);
        }
        catch(err) {
            message.channel.send(`Commande non reconnue vérifiez la typo (#Etape x: commande)`);
        }
    } else if (fs.existsSync(`./edition/_${ffs}.js`)) {
        message.channel.send (`Veuillez donner le numéro de l'étape pour laquelle vous voulez entrer le code sans "#"`)
        .then(() => {
            let f = m => (Number(m.content ) !== null);

            message.channel.awaitMessages(f, {max: 1})
            .then((c) => {
                let pos = Number(c.last().content);
                let namel = `etape ${pos}`;
                require(`../edition/_${ffs}.js`)(message, namel);
                return;
            })
            .catch((error) => {
                console.log(error);
            });
        });
    } else if (fs.existsSync(`./edition/${ffs}.js`)) {
        return require(`../edition/${ffs}.js`)(message);
    }
}
