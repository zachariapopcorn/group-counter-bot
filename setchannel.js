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
        return message.channel.send('Please supply a log channel for me to log to');
    }
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!channel) {
        return message.channel.send('Invalid channel');
    }
    await db.set("logChannel", channel);
    return message.channel.send(embedMaker(message.author, 'Success', `You have successfully set the channel to ${channel}`));
}