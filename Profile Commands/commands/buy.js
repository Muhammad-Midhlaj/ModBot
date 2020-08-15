const fs = require("fs");
let bg = require("../bg.json");
  const Discord = require("discord.js");
module.exports.run = async (bot, message, args, sql) => {

    
    
    let bgnum = parseInt(args[0]);
    if(message.mentions.users.size >= 1) return message.reply("خطأ بالأمر");
    if(!args[0]) return message.reply("الرجاء تحديد الخلفيه")
    if(isNaN(parseInt(args[0]))) return message.reply("الرجاء اختيار رقم خلفية صحيح");
    if(!bg[parseInt(args[0])].bg) return message.reply("الرجاء اختيار رقم خلفية صحيح");
    let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`).get()
        let sqlstr;
        let uCoins = rows.coins;
        if(uCoins<100) return message.reply("لا يوجد لديك المبلغ اللازم للشراء");


        sqlstr = `UPDATE profile SET coins = ${uCoins - 100} WHERE UserID = '${message.author.id}'`;
        sql.prepare(sqlstr).run()
        sqlstr = `UPDATE profile SET bg = ${parseInt(args[0])} WHERE UserID = '${message.author.id}'`;
        sql.prepare(sqlstr).run()
        return message.reply("تم الشراء بنجاح وخصم 100 ريال من رصيك").then(msg => {msg.delete(5000)});


    
}

module.exports.help = {
  name:"buy"
}
