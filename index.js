const discord = require("discord.js");
const keepAlive = require("./server");
const prefix = ">";
require('dotenv').config();
const client = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES
    ] 
});
let auth = process.env.AUTH
client.on("ready", () => {
    console.log("Bot is listening, has started")
    client.user.setStatus("online")
    client.user.setActivity("Midnight Blues", {type: 'WATCHING'});
})
client.on("messageCreate", msg => {
    if(msg.author.bot){
    }
    else{
        var args = msg.content.slice(Number(prefix.length)).split(/ +/);
        if(args[0]=="mn"||args[0]=="modnick"){
            let staffRole = msg.member.roles.cache.find(role => role.name == "・Staff")
            let bdRole = msg.member.roles.cache.find(role => role.name == "・Bot Dev")
            if(staffRole != null || bdRole != null){
                if(!args[1]){
                    msg.react("❌")
                    msg.reply("❌ | Please mention the user first!")
                }
                else{
                    var id = args[1].replace("<@!","").replace(">","")
                    let target = msg.guild.members.cache.get(id)
                    console.log(`id. ${id}, idmemeber: ${target}`)
                    target.setNickname("Moderated Nickname "+Number(Math.floor(Math.random() * 9999)) + Number(1000))
                    msg.react('✅')
                    msg.reply(`✅ | Moderated <@${target.user.id}>`)
                }
            }
            else{
                msg.react('❌')
                msg.reply("❌ | Skill issue.")
            }
            setTimeout(() => {
                msg.delete()
            }, 1500);
        }
    }
})
keepAlive()
client.login(auth)