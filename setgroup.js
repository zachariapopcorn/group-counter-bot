const Discord = require('discord.js');
const roblox = require('noblox.js');
const http = require('axios').default;
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
        return message.channel.send('Please supply a group id');
    }
    let groupId = args[0];
    if(isNaN(groupId)) {
        return message.channel.send('Invalid group id');
    }

    // Impletmented via http request as roblox.getGroup(id) was failing to tell user that it was an invalid group id in testing phase

    try {
        await http({
            baseURL: 'https://groups.roblox.com/',
            url: `v1/groups/${groupId}`,
            method: "GET"
        });
    } catch {
        return message.channel.send('Invalid group id');
    }

    await db.set("group", groupId);
    await db.set("currentLogged", 0);
    return message.channel.send(embedMaker(message.author, 'Success', `You have successfully set the group to ${groupId}`));
}