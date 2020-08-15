const fs = require("fs");
let bg = require("../bg.json");
const ms = require('ms')
  const Discord = require("discord.js");
  const coolDown = new Set();
module.exports.run = async (bot, message, args, sql) => {
      let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`).get()
        let uCoins = rows.coins;
		let amount = Math.floor((Math.random() * 500) + 1) // Money
    
          if(coolDown.has(message.author.id)) return message.channel.send(`**:stopwatch: | ${message.author.username}, your invite :yen: daily credits refreshes in \`\`1 Day\`\`.**`);
      let time = uCoins.timeDaily; // select last daily
    let credits = uCoins.credits; // credits before daily
      coolDown.add(message.author.id);

  
        let sqlstr;
        uCoins + amount 


        sqlstr = `UPDATE profile SET coins = ${uCoins += amount} WHERE UserID = '${message.author.id}'`;
        sql.prepare(sqlstr).run()
        return message.reply("**:atm:  |  "+message.author.username+", you received your :yen: "+amount+" daily credits!**").then(msg => {msg.delete(5000)});


      setTimeout(() => {
        coolDown.remove(message.author.id);
     },86400000);
}

module.exports.help = {
  name:"daily"
}
