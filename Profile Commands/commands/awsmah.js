const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
  if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("رووح العب بعيد يا بابا!");
    let helpembed1 = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL)
    .setTitle("~ Dragon bot 🐲 ~")
    .setDescription(`0 0 0 0 0 0`+` @user`+` وسام`+`d!`)
    .setColor("RANDOM")
    .addField("**  إستبدل أحد الأصفار برقم الوسام مثال **", `0 0 0 0 3 1`+` @user`+` وسام`+`d!`)
    .addField("● [مربع فارغ]", '0')
    .addField("● [علم السعودية]", '1')
    .addField("● [علم الكويت]", '2')
    .addField("● [Steam]", '3')
    .addField("● [علم الإمارات]", '4')
    .addField("● [علم البحرين]", '5')
    .addField("● [Golden Mic]", '6')
    .addField("● [علم العراق]", '7')
    .addField("● [لبنان]", '8')
    .addField("● [مصر]", '9')
    .addField("● [المغرب]", '10')
    .setFooter(`@${message.author.username} :المرسل`, message.author.displayAvatarURL);
    message.author.send(helpembed1);
}
module.exports.help = {
  name:"اوسمه"
}
