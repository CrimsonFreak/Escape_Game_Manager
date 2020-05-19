const { MessageEmbed } = require('discord.js');
module.exports = new MessageEmbed()
    .setColor(`#9ff000`)
    .setTitle(`Liste des commandes d'édition. Peuvent s'utiliser sous la forme : #Etape x: commande`)
    .addFields(
        {
            name: `**#Etape 0**: (texte_oui ou image)`,
            value: `Etape 'fantôme' qui permet d'entrer le texte et/ou l'image à envoyer au joueur lorsqu'il lance le jeu.`
        },
        {
            name: `**#code**`,
            value: `Editer le code à donner pour passer l'étape. Crée également un rôle discord pour l'étape si inexistant.`
        },
        {
            name: `**#image**`,
            value: `Ajouter une image à attacher au message de succès.`
        },
        {
            name: `**#texte_oui**`,
            value: `Ajouter le texte à envoyer en cas de succès pour une étape. Pour ajouter un lien vers un fichier texte ou audio, ajoutez simplement le lien à la fin du texte.`
        },
        {
            name: `**#texte_non**`,
            value: `Ajouter le texte à envoyer en cas d'échec pour une étape.`
        },
        {
            name: `**#test**`,
            value: `Renvoie toutes les données relatives à l'étape.`
        },
        {
            name: `Suite`,
            value: `**Liste des commandes générales**`
        },
        {
            name: `**#check**`,
            value: `Lance le test pour chacune des étapes`
        },
        {
            name: `**#start**`,
            value: `Définit la commande à entrer par les joueurs pour débuter (!start par défaut)`
        },
        {
            name: `**#rolefinal**`,
            value: `Permet de changer le nom du Rôle discord des joueurs gagnants (par défaut "Explorateurs"). NE PAS RENOMMER MANUELLEMENT`
        },
        {
            name: `**!commandes**`,
            value: `Renvoie ce message.`
        },
        {
            name: `**!edit**`,
            value: `Relance l'édition et écrase toutes les données. Les rôles ne sont pas supprimés. Faites le manuellement si nécessaire.`
        },
    )
;
