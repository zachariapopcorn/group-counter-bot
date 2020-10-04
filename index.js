const Discord = require('discord.js');
const fs = require('fs');
const db = require('./db.js');
const roblox = require('noblox.js');
const client = new Discord.Client();
const token = "NzYxNDQ1ODQxNzM0NTk4Njg3.X3atsw.eUZXgZsnSLUunuD8cptIxgO4diU";
const prefix = "?";
const commandList = [];

fs.readdir('./commands', async (err, files) => {
    if(err) throw new Error(err);
    files.forEach(async (file) => {
        if(!file.endsWith('.js')) return;
        let cmdFile = require(`./commands/${file}`);
        commandList.push({
            file: cmdFile,
            name: file.split('.')[0]
        });
    });
});

function embedMaker(author, title, description) {
    let embed = new Discord.MessageEmbed();
    embed.setColor("BLUE");
    embed.setAuthor(author.tag, author.displayAvatarURL());
    embed.setTitle(title);
    embed.setDescription(description);
    embed.setFooter('Command created by zachariapopcorn#8105, have a nice day!');
    return embed;
}

async function check() {
    let channel = await db.get("logChannel");
    if(!channel) return;
    channel = client.channels.cache.get(channel.id);
    if(!channel) return;
    let goal = await db.get("goal");
    if(!goal) return;
    let currentLogged = await db.get("currentLogged") || 0;
    let groupId = await db.get("group");
    if(!groupId) return;
    let memberCount = (await roblox.getGroup(groupId)).memberCount;
    if(memberCount == currentLogged) return;
    if(memberCount >= goal) {
        let e = embedMaker(client.user, 'Goal Reached', `We have reached our goal of ${goal} group members! We are now ${memberCount - goal} group members above our current goal`);
        e.addField('Information', `**Old Membercount**: ${currentLogged}\n**New Membercount**: ${memberCount}\n**Goal Reached?**: Yes`);
        await db.set("currentLogged", memberCount);
        return channel.send(e);
    } else {
        if(memberCount > currentLogged) {
            let e = embedMaker(client.user, 'Addition', `We have grown by ${memberCount - currentLogged} group member(s)! Now we are ${goal - memberCount} group members away from our goal of ${goal} group members`);
            e.addField('Information', `**Old Membercount**: ${currentLogged}\n**New Membercount**: ${memberCount}\n**Goal Reached?**: No`);
            await db.set("currentLogged", memberCount);
            return channel.send(e);
        } else {
            let e = embedMaker(client.user, 'Subtraction', `We have lost ${currentLogged - memberCount} group member(s)! Now we are ${goal - memberCount} group members away from our goal of ${goal} group members`);
            e.addField('Information', `**Old Membercount**: ${currentLogged}\n**New Membercount**: ${memberCount}\n**Goal Reached?**: No`);
            await db.set("currentLogged", memberCount);
            return channel.send(e);
        }
    }
}

setInterval(async () => {
    await check();
}, 5000);

client.on('ready', async() => {
    console.log('Logged in');
});

client.on('message', async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix));
    if(message.channel.type === 'dm') return;
    const args = message.content.slice(prefix.length).split(" ");
    let command = args.shift().toLowerCase();
    let index = commandList.findIndex(cmd => cmd.name === command);
    if(index == -1) return;
    commandList[index].file.run(client, message, args);
});

client.login(token);