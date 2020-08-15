const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, sql) => {
  //!pay @isatisfied 59345
  let pUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(message.mentions.users.size < 1) return message.reply("لم يتم تحديد المستخم!");
  if(pUser.id === message.author.id) return message.reply("لا يمكنك التحويل إلى نفسك");
  let amount = args.join(" ").slice(22);
  let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${pUser.id}'`).get()

    if(!rows) return message.channel.send("المراد التحويل له غير مسجل بعد").then(msg => {msg.delete(5000)});
    let pCoins = rows.coins;
    
  let rows2 = sql.prepare(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`).get()

    let sqlstr;
    if(!rows2) return message.reply("حاول مرة أخرى").then(msg => {msg.delete(5000)});
    let sCoins = rows2.coins;

  
  if(sCoins < args[1]) return message.reply("المبلغ غير متوفر!");
  if(!parseInt(args[1])) return message.reply("غلط");
if(parseInt(args[1]) < 0) return message.reply("غلط");
if(isNaN(amount)) return message.reply("غلط");
  
  sqlstr = `UPDATE profile SET coins = ${sCoins - parseInt(args[1])} WHERE UserID = '${message.author.id}'`;
  sql.prepare(sqlstr).run()
  sqlstr = `UPDATE profile SET coins = ${pCoins + parseInt(args[1])} WHERE UserID = '${pUser.id}'`;
  sql.prepare(sqlstr).run()

  let payEmb = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  .setTitle(`✔[حوالة بنكية] [${args[1]} ريال]`)
  .setColor("#C2C2C2")
  .addField("[من المطنوخ]", `${message.author}`, true)
  .addField("[إلى]", `${pUser}`, true)
  message.channel.send(payEmb);


}

module.exports.help = {
  name: "transfer"
}
