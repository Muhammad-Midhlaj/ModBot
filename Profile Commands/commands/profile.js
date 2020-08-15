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
      
    // sql.prepare(`set @row_num = 0`).run()
 let rows  =  sql.prepare(`SELECT * FROM profile WHERE UserID = '${puser.id}'`).get()
let rankedtext = sql.prepare(`SELECT * FROM (SELECT a1.UserID, a1.xp , COUNT (a2.xp) rank 
    FROM profile a1, profile a2 
    WHERE a1.xp < a2.xp OR (a1.xp=a2.xp AND a1.UserID = a2.UserID) 
    GROUP BY a1.UserID, a1.xp 
    ORDER BY a1.xp DESC, a1.UserID DESC) WHERE UserID = '${puser.id}'`).get()
        let sqlstr;
        if(!rows) return message.reply("لم يتم تسجيله بقاعدة البيانات بعد").then(msg => {msg.delete(5000)});
            
    let ubackg = rows.bg;
    let uw0 = rows.w0;
    let uw1 = rows.w1;
    let uw2 = rows.w2;
    let uw3 = rows.w3;
    let uw4 = rows.w4;
    let uw5 = rows.w5;
    let uCoins = rows.coins;
    let curlvl = rows.lvl;
    let curxp = rows.xp;
    let curbg = bg[ubackg].bg;
    let w0 = wesam[uw0].w;
    let w1 = wesam[uw1].w;
    let w2 = wesam[uw2].w;
    let w3 = wesam[uw3].w;
    let w4 = wesam[uw4].w;
    let w5 = wesam[uw5].w;
    let nn = rows.note;
    let curlikes = rows.likes;
    let currep = rows.rep;
    let currk = rankedtext.rank;
    if(currep >= 0){
        color = '#008000'
        arrow = '↑'
    }

    else{
        color = '#FF0000'
        arrow = '↓'
    }
let words = []
    let ad = ''
    words = nn.split(" ");
for(let i =0 ; i < words.length ; i++){
    ad = ad + words[i] + ' ';
    if(i === 6 || i === 12 || i === 18){
        ad = ad + `\n`
    }
}

    
    let Image = Canvas.Image,
    canvas = new Canvas(400, 400),
    ctx = canvas.getContext('2d');
        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
fs.readFile(curbg,async function (err, Background) {
    if (err) return console.log(err);
    let ground = new Image;
    ground.src = Background;
    await ctx.drawImage(ground, 0, 0, 400, 400);

})

jimp.read('./img/profileme1.png',async function (err, ava) {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, buffprof) {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = buffprof;
        await ctx.drawImage(prof, 0, 0, 400, 400);
 
jimp.read(w0,async function (err, ava) {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, w0b) {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = w0b;
      
       await ctx.drawImage(prof, 178, 314, 32, 32);
    })
})
jimp.read(w1,async function (err, ava) {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, w1b)  {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = w1b;
        await ctx.drawImage(prof, 220, 314, 32, 32);
    })
})
jimp.read(w2,async function (err, ava) {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, w2b) {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = w2b;
       await ctx.drawImage(prof, 261, 314, 32, 32);
    })
})
jimp.read(w3,async function (err, ava)  {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, w3b)  {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = w3b;
        await ctx.drawImage(prof, 302, 314, 32, 32);
    })
})
jimp.read(w4,async function (err, ava)  {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, w4b)  {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = w4b;
        await ctx.drawImage(prof, 343, 314, 32, 32);
    })
})
jimp.read(w5,async function (err, ava)  {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, w5b)  {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = w5b;
        await ctx.drawImage(prof, 178, 355, 32, 32);
    })
})
         })
})

                jimp.read(puser.user.displayAvatarURL, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);

                       let ava = new Image;
                        ava.src = buf;
                        ctx.drawImage(ava, 16, 73, 95, 95);

                        ctx.font = '12px Arial';
                        ctx.fontSize = '12px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "right";
                        ctx.fillText(ad, 363, 69);
                        
                        //ur name
                        ctx.font = '16px Arial';
                        ctx.fontSize = '16px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(puser.user.username, 220, 155);
                        ctx.font = '12px Arial';
                        ctx.fontSize = '12px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(`${uCoins}`, 258, 210);
                        ctx.font = '12px Arial';
                        ctx.fontSize = '12px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(`${curxp}`, 258, 236);
                        ctx.font = '12px Arial';
                        ctx.fontSize = '12px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(`# ${currk}`, 258, 262);
                        ctx.font = '32px Arial';
                        ctx.fontSize = '32px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(`${curlvl}`, 73, 235);
                        ctx.font = '32px Arial';
                        ctx.fontSize = '32px';
                        ctx.fillStyle = "#0000FF";
                        ctx.textAlign = "center";
                        ctx.fillText(`♥${curlikes}`, 60, 310);
                        ctx.font = '32px Arial';
                        ctx.fontSize = '32px';
                        ctx.fillStyle = color;
                        ctx.textAlign = "center";
                        ctx.fillText(`${arrow}${currep}`, 60, 375);
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

    let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`).get()
    
      if(rows.length < 1) return message.reply("تم تسجيلك حاول بعد 20 ثانية").then(msg => {msg.delete(5000)});
let rankedtext = sql.prepare(`SELECT * FROM (SELECT a1.UserID, a1.xp , COUNT (a2.xp) rank 
    FROM profile a1, profile a2 
    WHERE a1.xp < a2.xp OR (a1.xp=a2.xp AND a1.UserID = a2.UserID) 
    GROUP BY a1.UserID, a1.xp 
    ORDER BY a1.xp DESC, a1.UserID DESC) WHERE UserID = '${message.author.id}'`).get()

  let ubackg = rows.bg;
    let uw0 = rows.w0;
    let uw1 = rows.w1;
    let uw2 = rows.w2;
    let uw3 = rows.w3;
    let uw4 = rows.w4;
    let uw5 = rows.w5;
    let uCoins = rows.coins;
    let curlvl = rows.lvl;
    let curxp = rows.xp;
    let curbg = bg[ubackg].bg;
    let w0 = wesam[uw0].w;
    let w1 = wesam[uw1].w;
    let w2 = wesam[uw2].w;
    let w3 = wesam[uw3].w;
    let w4 = wesam[uw4].w;
    let w5 = wesam[uw5].w;
    let nn = rows.note;
    let curlikes = rows.likes;
    let currep = rows.rep;
    let currk = rankedtext.rank;
    if(currep >= 0){
        color = '#008000'
        arrow = '↑'
    }

    else{
        color = '#FF0000'
        arrow = '↓'
    }
    let words = []
    let ad = ''
    words = nn.split(" ");
for(let i =0 ; i < words.length ; i++){
    ad = ad + words[i] + ' ';
    if(i === 6 || i === 12 || i === 18){
        ad = ad + `\n`
    }
}


    let Image = Canvas.Image,
    canvas = new Canvas(400, 400),
    ctx = canvas.getContext('2d');
        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
fs.readFile(curbg, async function (err, Background) {
    if (err) return console.log(err);
    let ground = new Image;
    ground.src = Background;
    await ctx.drawImage(ground, 0, 0, 400, 400);

})

jimp.read('./img/profileme1.png',async function (err, ava) {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, buffprof) {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = buffprof;
      
       await ctx.drawImage(prof, 0, 0, 400, 400);

jimp.read(w0,async function (err, ava)  {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, w0b) {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = w0b;
      
        await ctx.drawImage(prof, 178, 314, 32, 32);
    })
})
jimp.read(w1,async function (err, ava)  {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, w1b) {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = w1b;
        await ctx.drawImage(prof, 220, 314, 32, 32);
    })
})
jimp.read(w2,async function (err, ava)  {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, w2b)  {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = w2b;
       await ctx.drawImage(prof, 261, 314, 32, 32);
    })
})
jimp.read(w3,async function (err, ava) {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, w3b)  {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = w3b;
       await ctx.drawImage(prof, 302, 314, 32, 32);
    })
})
jimp.read(w4,async function (err, ava)  {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, w4b)  {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = w4b;
       await ctx.drawImage(prof, 343, 314, 32, 32);
    })
})
jimp.read(w5,async function (err, ava)  {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG,async function (err, w5b)  {
        if (err) return console.log(err);

        let prof = new Image;
        prof.src = w5b;
        await ctx.drawImage(prof, 178, 355, 32, 32);
    })
})
          })
})

                jimp.read(message.author.displayAvatarURL, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);

                       let ava = new Image;
                        ava.src = buf;
                        ctx.drawImage(ava, 16, 73, 95, 95);

                        ctx.font = '12px Arial';
                        ctx.fontSize = '12px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "right";
                        ctx.fillText(ad, 363, 69);
                        
                        //ur name
                        ctx.font = '16px Arial';
                        ctx.fontSize = '16px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(message.author.username, 220, 155);
                        ctx.font = '12px Arial';
                        ctx.fontSize = '12px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(`${uCoins}`, 258, 210);
                        ctx.font = '12px Arial';
                        ctx.fontSize = '12px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(`${curxp}`, 258, 236);
                        ctx.font = '12px Arial';
                        ctx.fontSize = '12px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(`# ${currk}`, 258, 262);
                        ctx.font = '32px Arial';
                        ctx.fontSize = '32px';
                        ctx.fillStyle = "#FFFFFF";
                        ctx.textAlign = "center";
                        ctx.fillText(`${curlvl}`, 73, 235);
                        ctx.font = '32px Arial';
                        ctx.fontSize = '32px';
                        ctx.fillStyle = "#0000FF";
                        ctx.textAlign = "center";
                        ctx.fillText(`♥${curlikes}`, 60, 310);
                        ctx.font = '32px Arial';
                        ctx.fontSize = '32px';
                        ctx.fillStyle = color;
                        ctx.textAlign = "center";
                        ctx.fillText(`${arrow}${currep}`, 60, 375);
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
  name:"profile"
}
