const discord = require("discord.js");
const axios = require("axios");
const voiceDiscord = require('@discordjs/voice')
const { MessageAttachment } = require("discord.js")
const keepAlive = require("./server");
const prefix = ">";
require('dotenv').config();
const {registerFont, createCanvas, loadImage} = require('canvas')
const {Cannervas} = require('canvas')
const client = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.GUILD_VOICE_STATES
    ] 
});
let auth = process.env.AUTH
client.on("ready", () => {
    console.log("Bot is listening, has started")
    client.user.setStatus("online")
    client.user.setActivity("Midnight Blues", {type: 'WATCHING'});
})
client.on("messageCreate", msg => {
    if(msg.content.startsWith(prefix)){
        if(msg.author.bot){
        }
        else{
            var CONTENT = msg.content.toLowerCase()
            var args = CONTENT.slice(Number(prefix.length)).split(/ +/);
            if(args[0]=="mn"||args[0]=="modnick"){
            let staffRole = msg.member.roles.cache.find(role => role.name == "・Staff")
            let bdRole = msg.member.roles.cache.find(role => role.name == "・Bot Dev")
            if(staffRole != null || bdRole != null){
                if(!args[1]){
                    msg.channel.send("Please mention the user first.")
                }
                else{
                    var id = args[1].replace("<@!","").replace(">","")
                    let target = msg.guild.members.cache.get(id)
                    console.log(`id. ${id}, idmemeber: ${target}`)
                    target.setNickname("Moderated Nickname "+Number(Math.floor(Math.random() * 9999)) + Number(1000))
                    msg.channel.send(`Moderated <@${target.user.id}>'s nickname.`)
                }
            }
            else{
                msg.channel.send("Skill issue.")
            }
            setTimeout(() => {
                msg.delete()
            }, 1500);
        }
    }
}
})
client.on('guildMemberAdd', member => {
    let avatar_url = msg.author.avatar
                const comicsans = require('@canvas-fonts/comic-sans-ms');
                registerFont(comicsans, {family: 'Comic Sans'});
                const canvas = createCanvas(400, 200)
                const ctx = canvas.getContext('2d')
                ctx.fillStyle = "BLACK";
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.font = 'bold 30px "Comic Sans"';
                ctx.fillStyle = '#FFFFFF';
                ctx.textAlign = 'center'
                ctx.fillText("Welcome", 200, 100);
                ctx.fillText(member.user.username, 200, 125)
                const attachment = new MessageAttachment(canvas.toBuffer())
                msg.channel.send({files: [ attachment ]})
})
keepAlive()
client.login(auth)
