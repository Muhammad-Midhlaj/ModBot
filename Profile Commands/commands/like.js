const ms = require("ms");
const fs = require("fs");
const Discord = require("discord.js");
const prettyMs = require('pretty-ms');
module.exports.run = async (bot, message, args, sql) => {
  let currentTime = Date.now()
let LUser;
  message.delete(5000);
  let pUser = message.mentions.users.first();
  if(message.mentions.users.size < 1) return message.channel.send("`#لايك @user#123`").then(msg => {msg.delete(5000)});
  let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${pUser.id}'`).get()

    if(!rows) return message.reply("`غير مسجل بعد`").then(msg => {msg.delete(5000)});
    LUser  = rows.likes;

    
    
      let sqlstr;
      let allliked = sql.prepare(`SELECT * FROM liked WHERE UserID = '${message.author.id}'`).all()
        
        if(!allliked) {
          
          rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${pUser.id}'`).get()

    if(rows.length < 1) return message.reply("`غير مسجل بعد`").then(msg => {msg.delete(5000)});
    let LUser  = rows.likes;
            sqlstr = `INSERT INTO liked (UserID, LikedUser, GuildID, Time) VALUES ('${message.author.id}', '${pUser.id}', '${message.guild.id}', '${currentTime}')`
           sql.prepare(sqlstr).run()
            sqlstr = `UPDATE profile SET likes = ${LUser + 1} WHERE UserID = '${pUser.id}'`;
            sql.prepare(sqlstr).run()
             return message.reply("تم الإعجاب").then(msg => {msg.delete(5000)});
            
        }else{
          for (var i = 0; i < allliked.length;i++){
            
          if(allliked[i].LikedUser === pUser.id){
            if(allliked[i].LikedUser !== pUser.id) continue;
            let timeleft = Date.now() - allliked[i].Time
            return message.channel.send(`__${prettyMs((timeleft), {verbose: true})}__** من قبل <@${pUser.id}>  تم الإعجاب بـ **`).then(msg => {msg.delete(10000)});
        
        }
          }
       
          
          
          let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${pUser.id}'`).get()

    if(rows.length < 1) return message.reply("`غير مسجل بعد`").then(msg => {msg.delete(5000)});
    let LUser  = rows.likes;
    sqlstr = `INSERT INTO liked (UserID, LikedUser, GuildID, Time) VALUES ('${message.author.id}', '${pUser.id}', '${message.guild.id}', '${currentTime}')`
           sql.prepare(sqlstr).run()
              sqlstr = `UPDATE profile SET likes = ${LUser + 1} WHERE UserID = '${pUser.id}'`;
              sql.prepare(sqlstr).run()
              return message.reply("تم الإعجاب").then(msg => {msg.delete(5000)});
             
           
        }  
              
          
            
  
  
        
        

    
  }
module.exports.help = {
name:"لايك"
}
