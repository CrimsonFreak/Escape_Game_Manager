let fs = require('fs');

module.exports = (member) => {
    let data = require('./players.json');

    if (data.hasOwnProperty(member.id)) {
        data[member.id].push(member.guild.name);
    } else {
        data[member.id] = [member.guild.name];
    }

    fs.writeFile('./players.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return console.log(err);
        }
    });
}
