const Discord = require("discord.js");
let bg = require("../bg.json");
let wesam = require("../wesam.json");
var Canvas = require('canvas')
var jimp = require('jimp')
const fs = require('fs');
const talkedRecently = new Set();


module.exports.run = async (bot, message, args, sql) => {
    let color;
    let arrow;
    let timeoute = new Discord.RichEmbed()
    .setColor("#C2C2C2")
    .setTitle("إنتظر 20 ثانية");
    if (talkedRecently.has(message.author.id)) {
        
        message.channel.send(timeoute).then(msg => {msg.delete(5000)});
} else {

  let puser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!message.mentions.users.size < 1){
      
    
    let rows = sql.prepare(`SELECT * FROM about WHERE UserID = '${puser.id}'`).get()

       
        if(!rows) return message.reply("لم يتم تسجيله بقاعدة البيانات بعد").then(msg => {msg.delete(5000)});

        let career = rows.career;
        let age = rows.age;
        let club = rows.club;
        let model = rows.model;
        let study = rows.study;
        let future = rows.future;
        let life = rows.life;
        let words = rows.words;

      let sentancelife = []
    let adlife = ''
    sentancelife = life.split(" ");
for(let i =0 ; i < sentancelife.length ; i++){
    adlife = adlife + sentancelife[i] + ' ';
    if(i === 2 || i === 4 || i === 6){
        adlife = adlife + `\n`
    }
}
      let sentancewords = []
    let adwords = ''
    sentancewords = words.split(" ");
for(let i =0 ; i < sentancewords.length ; i++){
    adwords = adwords + sentancewords[i] + ' ';
    if(i === 2 || i === 4 || i === 6){
        adwords = adwords + `\n`
    }
}
    
    
    let Image = Canvas.Image,
    canvas = new Canvas(575, 800),
    ctx = canvas.getContext('2d');

fs.readFile('./img/about.jpg',async function (err, Background) {
    if (err) return console.log(err);
    let ground = new Image;
    ground.src = Background;
    await ctx.drawImage(ground, 0, 0, 575, 800);

})



                jimp.read(puser.user.displayAvatarURL, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);

                       ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#000000";
                        ctx.textAlign = "center";
                        ctx.fillText(puser.user.username, 285, 330);

                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(career, 440, 415);
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(age, 440, 493);
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(study, 440, 573);
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(adlife, 440, 650);
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(club, 140, 415);
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(model, 140, 493);
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(future, 140, 573);
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(adwords, 140, 650);
                      
                        let ava = new Image;
                        ava.src = buf;
                        ctx.beginPath();
                        ctx.arc(287.300, 190, 85, 0, Math.PI*2, true);
                        ctx.closePath();
                        ctx.clip();
                        ctx.drawImage(ava, 183, 101, 210, 210);
                        setTimeout(function() {
                message.channel.send({files: [canvas.toBuffer()]});
            }, 1000)
                    })
                })
            
   
            
talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 20000);
    }
else{

    let rows = sql.prepare(`SELECT * FROM about WHERE UserID = '${message.author.id}'`).get()

      if(!rows) return message.reply("تم تسجيلك حاول بعد 20 ثانية").then(msg => {msg.delete(5000)});

      let career = rows.career;
        let age = rows.age;
        let club = rows.club;
        let model = rows.model;
        let study = rows.study;
        let future = rows.future;
        let life = rows.life;
        let words = rows.words;

      let sentancelife = []
    let adlife = ''
    sentancelife = life.split(" ");
for(let i =0 ; i < sentancelife.length ; i++){
    adlife = adlife + sentancelife[i] + ' ';
    if(i === 2 || i === 4 || i === 6){
        adlife = adlife + `\n`
    }
}
      let sentancewords = []
    let adwords = ''
    sentancewords = words.split(" ");
for(let i =0 ; i < sentancewords.length ; i++){
    adwords = adwords + sentancewords[i] + ' ';
    if(i === 2 || i === 4 || i === 6){
        adwords = adwords + `\n`
    }
}

    let Image = Canvas.Image,
    canvas = new Canvas(575, 800),
    ctx = canvas.getContext('2d');

fs.readFile('./img/about.jpg', async function (err, Background) {
    if (err) return console.log(err);
    let ground = new Image;
    ground.src = Background;
    await ctx.drawImage(ground, 0, 0, 575, 800);

})


                jimp.read(message.author.displayAvatarURL, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);

                        


                    
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#000000";
                        ctx.textAlign = "center";
                        ctx.fillText(message.author.username, 285, 330);

                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(career, 440, 415);
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(age, 440, 493);
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(study, 440, 573);
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(adlife, 440, 650);
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(club, 140, 415);
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(model, 140, 493);
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(future, 140, 573);
                        ctx.font = '900 25px Arial';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(adwords, 140, 650);
                      
                        let ava = new Image;
                        ava.src = buf;
                        ctx.beginPath();
                        ctx.arc(287.300, 190, 85, 0, Math.PI*2, true);
                        ctx.closePath();
                        ctx.clip();
                        ctx.drawImage(ava, 183, 101, 210, 210);

                        setTimeout(function() {
                message.channel.send({files: [canvas.toBuffer()]});
            }, 1000)
                    })
                })
            
talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 20000);
    }
    }
    
        }
module.exports.help = {
  name:"عني"
}
