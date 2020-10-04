const Discord = require('discord.js');
const db = require('../db.js');

function embedMaker(author, title, description) {
    let embed = new Discord.MessageEmbed();
    embed.setColor("BLUE");
    embed.setAuthor(author.tag, author.displayAvatarURL());
    embed.setTitle(title);
    embed.setDescription(description);
    embed.setFooter('Command created by zachariapopcorn#8105, have a nice day!');
    return embed;
}

exports.run = async(client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send('No permission');
    }
    if(!args[0]) {
        return message.channel.send('Please supply a goal');
    }
    let goal = args[0];
    if(isNaN(goal)) {
        return message.channel.send('Invalid goal');
    }
    await db.set("goal", goal);
    return message.channel.send(embedMaker(message.author, 'Success', `You have successfully set the goal to ${goal}`));
}