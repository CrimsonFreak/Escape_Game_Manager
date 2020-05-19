let Discord = require('discord.js');
let config = require('./config.json');
let main = new Discord.Client;

module.exports = main;

try {
    main
        .on(
            'ready',
            require('./events/ready.js')
        )
        .on(
            'message',
            require('./events/message.js')
        )
        .on(
            'guildMemberAdd',
            require('./events/guildMemberAdd.js')
        )
        .on(
            'guildMemberRemove',
            require('./events/guildMemberRemove.js')
        )
    ;
    main.login(config.token);
}
catch(err) {
    console.log(err);
}
