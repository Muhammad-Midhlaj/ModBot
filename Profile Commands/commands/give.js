const fs = require("fs");

  const Discord = require("discord.js");

module.exports.run = async (bot, message, args, sql) => {

    message.delete();
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
    let pUser = message.mentions.users.first();
    if(!pUser)return message.channel.send("الرجاء تحديد الشخص المستحق للوسم").then(msg => {msg.delete(5000)});
    if(message.mentions.users.first() < 1) return message.channel.send("الرجاء تحديد الشخص المستحق للوسم").then(msg => {msg.delete(5000)});
  let rows =  sql.prepare(`SELECT * FROM profile WHERE UserID = '${pUser.id}'`).get()

        let sqlstr;
        sqlstr = `UPDATE profile SET w0 = ${parseInt(args[1])}, w1 = ${parseInt(args[2])}, w2 = ${parseInt(args[3])}, w3 = ${parseInt(args[4])}, w4 = ${parseInt(args[5])}, w5 = ${parseInt(args[6])} WHERE UserID = '${pUser.id}'`;
        sql.prepare(sqlstr).run()
 

    return message.reply("تم إعطاء الوسام بنجاح").then(msg => {msg.delete(5000)});
}

module.exports.help = {
  name:"wissam"
}
