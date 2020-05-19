let fs = require('fs');

module.exports = (member) => {
    let data = require('./players.json');

    data[member.id].splice(data[member.id].indexOf(member.guild.name), 1);
    
    fs.writeFile('./players.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return console.log(err);
        }
    });
}
