const {Discord, MessageAttachment} = require("discord.js");
var Jimp = require("jimp");
var Canvas = require('canvas')
const fs = require('fs');
module.exports.run = async (bot, message, args, sql) => {

  let Image = Canvas.Image,
  canvas = new Canvas(414, 400),
  ctx = canvas.getContext('2d');
      ctx.patternQuality = 'bilinear';
      ctx.filter = 'bilinear';
      ctx.antialias = 'subpixel';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 2;
fs.readFile("./img/help.png", function (err, Background) {
  if (err) return console.log(err);
  let ground = new Image;
  ground.src = Background;
  ctx.drawImage(ground, 0, 0, 414, 400);

        message.channel.send({files: [canvas.toBuffer()]});

});

        }
module.exports.help = {
  name:"shr7"
}
