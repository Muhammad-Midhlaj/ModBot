const ms = require("ms");
const fs = require("fs");
const Discord = require("discord.js");
const prettyMs = require('pretty-ms');
module.exports.run = async (bot, message, args, sql) => {
  let currentTime = Date.now()
let LUser;
  message.delete(5000);
  let pUser = message.mentions.users.first();
  if(message.mentions.users.size < 1) return message.channel.send("`#سمعة @user#123`").then(msg => {msg.delete(5000)});
  {
  let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${pUser.id}'`).get()
  
    if(rows.length < 1) return message.reply("`غير مسجل بعد`").then(msg => {msg.delete(5000)});
    let LUser  = rows.rep;
    
  }
    
    
      let sqlstr;
      let allrep = sql.prepare(`SELECT * FROM rep WHERE UserID = '${message.author.id}'`).all()

        
        if(!allrep) {
          {
          let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${pUser.id}'`).get()
    if(rows.length < 1) return message.reply("`غير مسجل بعد`").then(msg => {msg.delete(5000)});
    let LUser  = rows.rep;
            sqlstr = `INSERT INTO rep (UserID, LikedUser, GuildID, Time) VALUES ('${message.author.id}', '${pUser.id}', '${message.guild.id}', '${currentTime + 43200000}')`
          sql.prepare(sqlstr).run()
          if(args[1] === '-'){
          sqlstr = `UPDATE profile SET rep = ${LUser - 1} WHERE UserID = '${pUser.id}'`;
          sql.prepare(sqlstr).run()
           return message.reply("تم خفض السمعة").then(msg => {msg.delete(5000)});
          }else{
            sqlstr = `UPDATE profile SET rep = ${LUser + 1} WHERE UserID = '${pUser.id}'`;
            sql.prepare(sqlstr).run()
             return message.reply("تم رفع السمعة").then(msg => {msg.delete(5000)});
           }
            }
        }else{
          for (var i = 0; i < allrep.length;i++){
            
          if(allrep[i].LikedUser === pUser.id){
            if(allrep[i].LikedUser !== pUser.id) continue;
            let timeleft = allrep[i].Time - Date.now()
            return message.channel.send(`__${prettyMs((timeleft), {verbose: true})}__** من قبل حاول بعد <@${pUser.id}>  تم إعطاء سمعة لـ **`).then(msg => {msg.delete(10000)});
        
        }
          }
       
          
          {
          let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${pUser.id}'`).get()
    if(rows.length < 1) return message.reply("`غير مسجل بعد`").then(msg => {msg.delete(5000)});
    let LUser  = rows.rep;
    sqlstr = `INSERT INTO rep (UserID, LikedUser, GuildID, Time) VALUES ('${message.author.id}', '${pUser.id}', '${message.guild.id}', '${currentTime + 43200000}')`
           sql.prepare(sqlstr).run()
           if(args[1] === '-'){
            sqlstr = `UPDATE profile SET rep = ${LUser - 1} WHERE UserID = '${pUser.id}'`;
            sql.prepare(sqlstr).run()
             return message.reply("تم خفض السمعة").then(msg => {msg.delete(5000)});
            }else{
              sqlstr = `UPDATE profile SET rep = ${LUser + 1} WHERE UserID = '${pUser.id}'`;
            sql.prepare(sqlstr).run()
               return message.reply("تم رفع السمعة").then(msg => {msg.delete(5000)});
             }
          }
            
        }  
              
       
            
  
  
        
        

    
  }
module.exports.help = {
name:"rep2"
}
