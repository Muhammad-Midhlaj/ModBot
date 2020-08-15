const {Discord, MessageAttachment} = require("discord.js");
let bg = require("../bg.json");
var Jimp = require("jimp");
var Canvas = require('canvas')
const fs = require('fs');
module.exports.run = async (bot, message, args, sql) => {
  let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`).get()

let ubackg = rows.bg;
  let curbg = bg[ubackg].bg;
  let Image = Canvas.Image,
  canvas = new Canvas(800, 800),
  ctx = canvas.getContext('2d');
      ctx.patternQuality = 'bilinear';
      ctx.filter = 'bilinear';
      ctx.antialias = 'subpixel';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;
fs.readFile("./img/shopping.jpg", function (err, Background) {
  if (err) return console.log(err);
  let ground = new Image;
  ground.src = Background;
  ctx.drawImage(ground, 0, 0, 800, 800);
  Jimp.read(curbg, (err, ava) => {
    if (err) return console.log(err);
    ava.getBuffer(Jimp.MIME_PNG, (err, buf) => {
        if (err) return console.log(err);

       let ava = new Image;
        ava.src = buf;
        ctx.drawImage(ava, 46, 39, 170, 170);
        message.channel.send({files: [canvas.toBuffer()]});
    });
  });
});
  {
 let rows = sql.prepare(`SELECT * FROM profile WHERE UserID = '${message.author.id}'`).get()


let ubackg = rows.bg;
let curbg = bg[ubackg].bg;
let Image = Canvas.Image,
canvas = new Canvas(800, 800),
ctx = canvas.getContext('2d');
    ctx.patternQuality = 'bilinear';
    ctx.filter = 'bilinear';
    ctx.antialias = 'subpixel';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
fs.readFile("./img/shopping2.jpg", function (err, Background) {
if (err) return console.log(err);
let ground = new Image;
ground.src = Background;
ctx.drawImage(ground, 0, 0, 800, 800);
Jimp.read(curbg, (err, ava) => {
  if (err) return console.log(err);
  ava.getBuffer(Jimp.MIME_PNG, (err, buf) => {
      if (err) return console.log(err);

     let ava = new Image;
      ava.src = buf;
      ctx.drawImage(ava, 46, 39, 170, 170);
      message.channel.send({files: [canvas.toBuffer()]});
  });
});
});

}
        }
module.exports.help = {
  name: "store"
}
