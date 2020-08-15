const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args, sql) => {
  let career = args.join(" ");
  if(message.mentions.users.size >= 1) return message.reply("خطأ بالأمر");
  if(career.length < 1) return message.reply("`الرجاء كتابة منصبك`")
  if(career.length > 20) return message.reply("الرجاء كتابة كلام لا يزيد عن 20 حرف")

  let rows = sql.prepare(`SELECT * FROM about WHERE UserID = '${message.author.id}'`).get()
  let sqlstr;
  let uCoins = rows.career;

  sqlstr = `UPDATE about SET career = "${career}" WHERE UserID = '${message.author.id}'`;
  sql.prepare(sqlstr).run()

  return message.reply("تم تحديث معلوماتك بنجاح").then(msg => {msg.delete(5000)});
 
}

module.exports.help = {
name:"منصبي"
}
