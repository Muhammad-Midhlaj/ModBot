const fs = require("fs");
  const Discord = require("discord.js");

module.exports.run = async (bot, message, args, sql) => {
    let noty = args.join(" ");
    if(message.mentions.users.size >= 1) return message.reply("خطأ بالأمر");
    if(noty.length < 1) return message.reply("الرجاء كتابة كلام مناسب عن نفسك")
    if(noty.length > 180) return message.reply("الرجاء كتابة كلام لا يزيد عن 180 حرف")

    let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`).get()
    let sqlstr;
    let uCoins = rows.coins;
    if(uCoins<200) return message.reply("لا يوجد لديك المبلغ اللازم");



    sqlstr = `UPDATE profile SET note = "${noty}" WHERE UserID = '${message.author.id}'`;
    sql.prepare(sqlstr).run();
    sqlstr = `UPDATE profile SET coins = ${uCoins - 200} WHERE UserID = '${message.author.id}'`;
  sql.prepare(sqlstr).run();

    return message.reply("تم تغيير المعلومات وخصم 200 ريال من رصيدك").then(msg => {msg.delete(5000)});
    
}

module.exports.help = {
  name:"note"
}
