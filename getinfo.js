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
    let channel = await db.get("logChannel");
    if(!channel) {
        channel = "NONE";
    } else {
        channel = `<#${channel.id}>`;
    }
    let goal = await db.get("goal");
    if(!goal) {
        goal = "NONE";
    }
    let currentLogged = await db.get("currentLogged");
    if(!currentLogged) {
        currentLogged = "NONE";
    }
    let group = await db.get("group");
    if(!group) {
        group = "NONE";
    }

    let groupLink
    if(group === "NONE") {
        groupLink = "NONE";
    } else {
        groupLink = `https://roblox.com/groups/${group}`;
    }

    let e = embedMaker(message.author, 'Bot Information Collected', `Here's the bot's setup information. If a value is "NONE" that means that the value isn't set`);
    e.addField('Bot Information', `**Channel**: ${channel}\n**Goal**: ${goal}\n**Current Members Logged**: ${currentLogged}\n**Group ID**: ${group}\n**Group Link**: [Click Me](${groupLink})`);
    return message.channel.send(e);
}