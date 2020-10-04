const Discord = require('discord.js');

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
    let e = embedMaker(message.author, 'Commands', `Here are all the avaiable commands that this bot has to offer`);
    e.addField('Commands', `**help** - Displays the help menu\n**getinfo** - Gets the information of the bot's configuration (hey that rhymes)\n**setgoal <goal>** - Sets the goal that the counter will count to\n**setchannel <channel>** - Sets the log channel that the bot will log to when it checks the group's members\n**setgroup <group id>** - Sets the group that the bot will watch`);
    return message.channel.send(e);
}