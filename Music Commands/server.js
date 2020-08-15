const { Client, RichEmbed } = require("discord.js");
const yt_api_key = "AIzaSyDV2JNcnCiCEW99ON7vvwBN5JkDWaIXkXc"
const client = new Client({ disableEveryone: true})
const ytdl = require("ytdl-core");
const devs = ["505638480248963072"]   
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const bot = require('./package.json');
const simpleytapi = require('simple-youtube-api')
const youtube = new simpleytapi(yt_api_key);
const config = require('../config/config.json')
const prefix = config.prefix;
client.login(config.token);
var guilds = {};



/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
 
client.on('message', async function(message) {
    if(message.author.bot) return;
    if(!message.channel.guild) return;
    //////////////////////////////////
    if(message.content === `<@${client.user.id}>`) return message.channel.send(`Hey I'am **${client.user.username}**. A nice music bot developed by <@${client.users.get(devs[0]).id}>\nGet In touch with me \`\`m-contact\`\``);
    const novc = "**:x: You are not in a voice channel.**"
    const yt = "✅"
    const correct = "✅"
    const nope = "❌"
    let args = message.content.split(' ').slice(1).join(" ");

    if (message.content.startsWith(`${prefix}eval`)) {
        const eargs = message.content.split(" ").slice(1);
        if(!devs.includes(message.author.id)) return;
        const clean = text => {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }
        
        try {
          const code = eargs.join(" ");
          let evaled = eval(code);
    
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);    
          message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) { 
          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
      } else if(message.content.toLowerCase().startsWith(`${prefix}help`)) {
       const { music, info } = require('./help');
       if(!args) return message.channel.send({embed: {
           author: {
               name: `${client.user.username} Help`,
               icon_url: client.user.avatarURL
           },
           description: `🏳 Want more help? \`\`${prefix}help <command>\`\` | Total Commands: **${music.map(m => m.name).length + info.map(m => m.name).length}**`,
           fields: [
               {
                name: '❯ Music Commands',
                value: `${music.map(m =>`\`\`${m.name}\`\``).join(" ")}`
               }, 
               {
                   name: "❯ Info Commands",
                   value: `${info.map(m =>`\`\`${m.name}\`\``).join(" ")}`
               }
           ], 
           color: 0xF19894,
           footer: {
               text: `${client.user.username} ${bot.version} Beta`
           }
       }})
       const foundCommand = music.find(m => m.name === args.toLowerCase()) || info.find(m => m.name === args.toLowerCase())
       if(foundCommand) {
        return message.channel.send("", {embed: {
            author: {
                name: `${foundCommand.name[0].toUpperCase() + foundCommand.name.slice(1)} Help`,
                icon_url: "https://images-ext-2.discordapp.net/external/ixx9VwaXIvBi71wGahYe_NzG51gFQonnXVBl2eEbQmk/https/cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png?width=473&height=473"
            },
            fields: [
                {
                 name: '❯ Description',
                 value: foundCommand.desc
                }, 
                {
                name: '❯ Usage',
                value: `\`\`${prefix + foundCommand.usage}\`\``,
                inline: true
                },
                {
                name: `❯ Aliases`,
                value: foundCommand.aliases.map(m => m).join(" ") || "N/A",
                inline: true
                }
            ], 
            color: 0xF19894,
        }})
       } else return message.channel.send({embed: {
        description:`**No command found with this name \`${args}\`**`,
        color: 0xff0000,
    }});
      }

      if(message.content.startsWith(`${prefix}info`)) {
        function convertMS(ms) {
            var d, h, m, s;
            s = Math.floor(ms / 1000);
            m = Math.floor(s / 60);
            s = s % 60;
            h = Math.floor(m / 60);
            m = m % 60;
            d = Math.floor(h / 24);
            h = h % 24;
            return {
                d: d,
                h: h,
                m: m,
                s: s
            };
        };   
        let u = convertMS(client.uptime);
        let uptime = u.d + " days  , " + u.h + " hrs  , " + u.m + " mins  , " + u.s + " secs"
        message.channel.send(new RichEmbed() 
        .setAuthor(client.user.username,client.user.avatarURL)
        .addField("Version", bot.version, true)
        .addField("Library", "[discordjs](https://www.npmjs.com/search?q=discord.js)", true)
        .addField("Creator", "Abady", true)
        .addField("Users", `${client.users.size}`, true)
        .addField('RAM Usage',`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,true)     
        .setFooter(`Uptime ${uptime} | ${client.user.username} doesn't use Lavalink!`)
        .setColor("RANDOM")
    )
      }

      else if(message.content.startsWith(`${prefix}contact`)) {
        if(!args) return message.channel.send(`Get in touch with me, leave a message. (Real Inqiures Only) \`\`m-contact (Your message)\`\``)
        if(args.length < 2) return message.channel.send(`Your message haven't delivered. make sure your message is more than one word.`)
        client.users.get(devs[0]).send(`${args}\n\n Server: ${message.guild.name} - User: ${message.author.tag}`).then(()=> {
            message.channel.send(`**Thank you!** Your message have been delivered. I'll try to reply as soon as possible.`, {files: ['https://pbs.twimg.com/media/DeikbSqV0AAUSUU.jpg']})
        })
     } else if (message.content.toLowerCase().startsWith(`${prefix}lyric`)) {
const lyricistapi = require('lyricist');
const lyric = new lyricistapi("3u50HX1N0KeDBMCN_y3W126tTcJizSOz-yJtJE7TOmQepOGkAPuzQhuZiRLG9BDn");
try {
    if(!args) {
        args = guilds[message.guild.id].queueNames[0].replace(/\[[^\]]*\]/g, "").replace(/ *\([^)]*\) */g, "").replace(/[^\w\s]/gi, "");
    } 
} catch (error) {
    return message.channel.send(`:x: Missing args.`)
}
const song = await lyric.search(args)
if(song[0]) {
const msg22 = await message.channel.send(`:bookmark_tabs: Fetching **${song[0].full_title}** Lyrics.`);
const songlyrics = await lyric.song(song[0].id, {fetchLyrics: true, textFormat: "dom"})
let fixedsonglyrics;
if(songlyrics.lyrics.length > 2047) fixedsonglyrics = songlyrics.lyrics.slice(0, 2000 - songlyrics.url.length) + `......\n\n[**Continue Here**](${songlyrics.url})`
else fixedsonglyrics = songlyrics.lyrics
msg22.edit("", {embed: {
    description: `\n${fixedsonglyrics}`,
    color:  0x7ec0ee,
    title: songlyrics.full_title,
    url: songlyrics.url,
    thumbnail: {
        url: songlyrics.header_image_url,
    },
}})
} else return message.channel.send(`:x: No results for **\`\`${args}\`\`**`)
     }

     function clear() { 
        guilds[message.guild.id].queue = [];
        guilds[message.guild.id].queueNames = [];
        guilds[message.guild.id].isPlaying = false;
        guilds[message.guild.id].dispatcher = null
        guilds[message.guild.id].voiceChannel = null;
        guilds[message.guild.id].skipReq = 0;
        guilds[message.guild.id].skipReq = [];
        guilds[message.guild.id].loop = false;
        guilds[message.guild.id].volume = 1;
    }
    
    const mess = message.content.toLowerCase();

    if (!guilds[message.guild.id]) {
        guilds[message.guild.id] = {
            queue: [],
            queueNames: [],
            isPlaying: false,
            dispatcher: null,
            voiceChannel: null,
            volume: 1,
            skipReq: 0,
            skippers: [],
            loop: false
        };
    }


    if (mess.startsWith(prefix + "play") || mess.startsWith(prefix+"شغل")) {
        if (message.member.voiceChannel || guilds[message.guild.id].voiceChannel != null) {
        const voiceChannel = message.member.voiceChannel
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if (!permissions.has('CONNECT')) return message.channel.send({embed: {description: "🛑 I don't have permission to CONNECT! Give me some."}});
        if (!permissions.has('SPEAK')) return message.channel.send({embed: {description: "🛑 I don't have permission to SPEAK! Give me some."}});
         if (args.length == 0 || !args) return message.channel.send(`:musical_note: m-play **<Youtube URL / Search>**`)
            if (guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying) {
                if(guilds[message.guild.id].queue.length > 100) return message.channel.send(``, {embed: {
                    description: `🔒 Sorry, max queue length is 100, do **${prefix}clear** to clear entire queue or **${prefix}clear <number>** to clear 1 item`
                }})
                if(args.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi) && !isYoutube(args)) {
                return message.channel.send(`:x: For some reasons you canno't play any other YT stream if it's not number #1 in queue. Do **\`\`clear\`\`** and try again.`)
                    }
                 if (args.match(/[?&]list=([^#\&\?]+)/)) {
                    const playlist = await youtube.getPlaylist(args);
                    if(!playlist) return message.channel.send(`:x: I couldn't get this playlist!`)
                    const videos = await playlist.getVideos();
                    const queuesync = 100 - guilds[message.guild.id].queue.length
                    if(queuesync < 0 || queuesync == 0) return message.channel.send(`:x: Cannot add this playlist, **\`\`MAX_QUEUE = 100\`\`** clear the current queue and try again!`)
                    videos.filter(m => m.thumbnails !== undefined).slice(0, queuesync).forEach(video => {
                        guilds[message.guild.id].isPlaying = true;
                        guilds[message.guild.id].queueNames.push(video.title)
                        guilds[message.guild.id].queue.push(video.id)
                    })
                    return message.channel.send(`[:musical_score: __${playlist.title}__] **${queuesync}** items Added to the **Queue**!`)                    ;
                }
                message.channel.send(`**${yt} Searching :mag_right: \`\`${args}\`\`**`).then(()=> {
                getID(args, function(id) {
                if(!id) return message.channel.send(`:x: I couldn't find anything with this title **${args}**.`);
                   fetchVideoInfo(id, function(err, videoInfo) {
                        if (err) throw new Error(err);
                        if(videoInfo.duration > 1800) return message.channel.send(`**${message.author.username}, :x: Cannot play a video that's longer than 30 minutes**`).then(message.react(nope));
                        else message.react(correct)
                        add_to_queue(id, message);
                        fetchVideoInfo(`${id}`, function(err, videoInfo) {

                      
                        guilds[message.guild.id].queueNames.push(videoInfo.title);
                        })
                    });
                })
            })
            } else {
            if (args.match(/[?&]list=([^#\&\?]+)/)) {
                const playlist = await youtube.getPlaylist(args);
                if(!playlist) return message.channel.send(`:x: I couldn't get this playlist!`)
                const videos = await playlist.getVideos(100)
                playMusic(videos[0].id, message)
                guilds[message.guild.id].queueNames.push(videos[0].title)
                guilds[message.guild.id].queue.push(videos[0].id)
                videos.filter(m => m.thumbnails !== undefined).slice(1, 100).forEach(video => {
                    guilds[message.guild.id].isPlaying = true;
                    guilds[message.guild.id].queueNames.push(video.title)
                    guilds[message.guild.id].queue.push(video.id)
                })
                return message.channel.send(`[:musical_score: __${playlist.title}__] **${videos.filter(m => m.thumbnails !== undefined).slice(0, 100).length}** items Added to the **Queue**!\nPlaying :notes: **\`\`${videos[0].title}\`\`** ― Now!`)                    ;
            } else {
                if(args.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi) && !isYoutube(args)) {
                    if(guilds[message.guild.id].queue[0]) return message.channel.send(`:x: For some reasons you canno't play any other YT stream if it's not number #1 in queue. Do **\`\`clear\`\`** and try again.`)
                    playMusic(args, message).catch(err => message.channel.send(`<:megErrOr:475075170231517184> That's not something to play!`))
                    guilds
                    guilds[message.guild.id].isPlaying = true;
                
                
                    } else { 
                        getID(args, function(id) {

                        fetchVideoInfo(`${id}`, function(err, videoInfo) {

                        let playembed2 = new RichEmbed()
                        .setTitle(`**Playing ${ videoInfo.title}**`)
                        .addField('Channel Name :' , `${videoInfo.owner}`, true)
                        .addField('Video Created at :' , `${ videoInfo.datePublished}`, true)
                        .addField('Views :' , `${ videoInfo.views}`, true)
                        .addField('Like👍 :' , `${ videoInfo.likeCount}`, true)
                        .addField('dislike👎 :' , `${ videoInfo.dislikeCount}`, true)
                        .addField('comments :' , `${ videoInfo.commentCount}`, true)
                        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/7/73/YouTube_Music.png")
                        .setColor('#ff0000')
                        .setImage(videoInfo.thumbnail)
        
                message.channel.send(playembed2).then(() => {
                getID(args, function(id) {
                    if(!id) return message.channel.send(`:x: I couldn't find anything with this title **${args}**.`);
                    fetchVideoInfo(id, function(err, videoInfo) {
                        if (err) throw new Error(err);
                        if(videoInfo.duration > 1800) return message.channel.send(`**${message.author.username}, :x: Cannot play a video that's longer than 30 minutes**`).then(message.react(nope))
                        else message.react(correct)
                        playMusic(id, message);
                        guilds[message.guild.id].isPlaying = true;
                        guilds[message.guild.id].queue.push(id);
                        guilds[message.guild.id].queueNames.push(videoInfo.title);
                    })
                })
            })
                })})}}
            }
        } else {
            message.channel.send(novc);
        }

    } else if (mess.startsWith(prefix + "skip") || mess.startsWith(prefix+"عدي")) {
        if(!message.member.voiceChannel) return message.channel.send(novc)
        if(message.member.hasPermission('MANAGE_CHANNELS')) {
        if (guilds[message.guild.id].queueNames[0]) {
            message.channel.send(`**:fast_forward: Skipped** ${guilds[message.guild.id].queueNames[0]}`);
            return skip_song(message);
        } else return message.channel.send(`**:x: Nothing playing in this server**`);
        }
        else
        if (guilds[message.guild.id].skippers.indexOf(message.author.id) === -1) {
            guilds[message.guild.id].skippers.push(message.author.id);
            guilds[message.guild.id].skipReq++;
            if (guilds[message.guild.id].skipReq >= Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)) {
                if (guilds[message.guild.id].queueNames[0]) {
                message.channel.send(`**:fast_forward: Skipped** ${guilds[message.guild.id].queueNames[0]}`);
                skip_song(message);
                } else return message.channel.send(`**:x: Nothing playing in this server**`);
            } else {
                message.channel.send(`:point_up::skin-tone-1: **${message.author.username}** has voted to skip current song! **${Math.floor(Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2) - guilds[message.guild.id].skipReq)}** more votes to skip!`);
            }
        } else {
            message.channel.send("<:megX:476797393283710991> you already voted to skip!");
        }

    } else if (mess.startsWith(prefix + "queue") || mess.startsWith(prefix+"قائمة")) {
        if(guilds[message.guild.id].queueNames.length < 1) return message.channel.send(`**:x: Nothing playing in this server**`);
        const numbaone = await youtube.getVideoByID(guilds[message.guild.id].queue[0])
        if(!guilds[message.guild.id].queueNames[1]) return message.channel.send('', {embed: {
        description: `__Now Playing:__\n**[${guilds[message.guild.id].queueNames[0]}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[0]})** \`\`${convert.fromS(numbaone.durationSeconds)}\`\` `,
        author: {
        name: `${message.guild.name}'s Queue.`,
        icon_url: message.guild.iconURL
        },
        color: 3447003
        }});
        else {
            let x;
            if(args > 1) {
             x = Math.floor(args)*10+1
            } else {
              x = Math.floor(11)
            }
            let i;
            if(args > 1) {
                i = x-11
               } else {
                 i = 0
               }
            //? Following is depracted, I'am going to use a queueTimes in guilds.
            // var queueTimes = [];            
            // for (var s = 0; s < x; s++) {
            // const videos = await youtube.getVideoByID(guilds[message.guild.id].queue[s])
            // let time = videos.durationSeconds
            // if(!videos.durationSeconds) time = 0
            // queueTimes.push(Math.floor(time))
            // }
            //?
            let queuelist = guilds[message.guild.id].queueNames.slice(x-10,x).map(song => `**\`\`${++i}.\`\`** [${song}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[i]})`).join('\n\n')
            if(!queuelist) return message.channel.send(`<:megX:476797393283710991> | Page doesn't exist!`)
            const embed = new RichEmbed()
            embed.setDescription(`__Now Playing:__\n**[${guilds[message.guild.id].queueNames[0]}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[0]})**\n\n:arrow_down: __Up Next__  :arrow_down:\n\n${queuelist}\n\n**Total items in queue:** ${guilds[message.guild.id].queueNames.length}`)
            embed.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/7/73/YouTube_Music.png")
            embed.setAuthor(`${message.guild.name}'s Queue (${Math.floor(x/10)} / ${Math.floor((guilds[message.guild.id].queue.slice(1).length+10) /10)})`)
            embed.setColor(3447003);
            message.channel.send(embed).then(async msg => {
                if(Math.floor((guilds[message.guild.id].queue.slice(1).length+10) /10) > 1) {
                    await msg.react("⏪")
                    await msg.react("◀")
                    await msg.react("🔵")
                    await msg.react("▶")
                    await msg.react("⏩")
                    const pages = Math.floor((guilds[message.guild.id].queue.slice(1).length+10) /10)
                    let page = Math.floor(x/10)
                    const back = msg.createReactionCollector((reaction, user) => reaction.emoji.name === "◀" && user.id === message.author.id, {time: 60000})
                    const doubleback = msg.createReactionCollector((reaction, user) => reaction.emoji.name === "⏪" && user.id === message.author.id, {time: 60000})
                    const doubleforwad = msg.createReactionCollector((reaction, user) => reaction.emoji.name === "⏩" && user.id === message.author.id, {time: 60000})
                    const forwad = msg.createReactionCollector((reaction, user) => reaction.emoji.name === "▶" && user.id === message.author.id, {time: 60000})
                    back.on('collect', async r => {
                        if(page === 1) return;
                        await r.remove(message.author);
                        await page--
                        x = Math.floor(page)*10+1
                        i = x-11
                        queuelist = guilds[message.guild.id].queueNames.slice(x-10,x).map(song => `**\`\`${++i}.\`\`** [${song}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[i]})`).join('\n\n')
                        embed.setDescription(`__Now Playing:__\n**[${guilds[message.guild.id].queueNames[0]}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[0]})**\n\n:arrow_down: __Up Next__  :arrow_down:\n\n${queuelist}\n\n**Total items in queue:** ${guilds[message.guild.id].queueNames.length}`)
                        embed.setAuthor(`${message.guild.name}'s Queue (${page} / ${pages})`)
                        msg.edit(embed)
                    })
                    forwad.on('collect', async r => {
                        if(page === pages) return;
                        await r.remove(message.author);
                        await page++
                        x = Math.floor(page)*10+1
                        i = x-11
                        queuelist = guilds[message.guild.id].queueNames.slice(x-10,x).map(song => `**\`\`${++i}.\`\`** [${song}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[i]})`).join('\n\n')
                        embed.setDescription(`__Now Playing:__\n**[${guilds[message.guild.id].queueNames[0]}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[0]})**\n\n:arrow_down: __Up Next__  :arrow_down:\n\n${queuelist}\n\n**Total items in queue:** ${guilds[message.guild.id].queueNames.length}`)
                        embed.setAuthor(`${message.guild.name}'s Queue (${page} / ${pages})`)
                        msg.edit(embed)
                    })
                    doubleback.on('collect', async r => {
                        if(page === 1) return;
                        await r.remove(message.author);
                        page = 1
                        x = Math.floor(page)*10+1
                        i = x-11
                        queuelist = guilds[message.guild.id].queueNames.slice(x-10,x).map(song => `**\`\`${++i}.\`\`** [${song}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[i]})`).join('\n\n')
                        embed.setDescription(`__Now Playing:__\n**[${guilds[message.guild.id].queueNames[0]}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[0]})**\n\n:arrow_down: __Up Next__  :arrow_down:\n\n${queuelist}\n\n**Total items in queue:** ${guilds[message.guild.id].queueNames.length}`)
                        embed.setAuthor(`${message.guild.name}'s Queue (${page} / ${pages})`)
                        msg.edit(embed)
                    })
                    doubleforwad.on('collect', async r => {
                        if(page === pages) return;
                        await r.remove(message.author);
                        page = pages
                        x = Math.floor(page)*10+1
                        i = x-11
                        queuelist = guilds[message.guild.id].queueNames.slice(x-10,x).map(song => `**\`\`${++i}.\`\`** [${song}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[i]})`).join('\n\n')
                        embed.setDescription(`__Now Playing:__\n**[${guilds[message.guild.id].queueNames[0]}](https://www.youtube.com/watch?v=${guilds[message.guild.id].queue[0]})**\n\n:arrow_down: __Up Next__  :arrow_down:\n\n${queuelist}\n\n**Total items in queue:** ${guilds[message.guild.id].queueNames.length}`)
                        embed.setAuthor(`${message.guild.name}'s Queue (${page} / ${pages})`)
                        msg.edit(embed)
                    })
                } else return; 
            }) 
        }
    }

if(mess.startsWith(prefix+"np")) {
    const short = require('short-number');
    if(!guilds[message.guild.id].queue[0] || !guilds[message.guild.id].isPlaying) return message.channel.send(`**:x: Nothing playing in this server**`)
    await message.channel.startTyping()
    const embed = new RichEmbed()
    await fetchVideoInfo(guilds[message.guild.id].queue[0], function(err, videoInfo) {
                        if (err) { 
                             embed.setAuthor("Now Playing", client.user.avatarURL)
                             embed.setTitle(guilds[message.guild.id].queueNames[0])
                             embed.setURL(guilds[message.guild.id].queue[0])
                             throw new Error(err);
                        } else { 
                            embed.setAuthor(`Now Playing`, client.user.avatarURL)
                            embed.setTitle(videoInfo.title)      
                            embed.setURL(videoInfo.url)
                            embed.addField("Channel", `[**${videoInfo.owner}**](https://youtube.com/channel/${videoInfo.channelId})`, true)
                            embed.addField("Duration", `${convert.fromS(videoInfo.duration, 'mm:ss')} — [**Download MP3**](https://www.flvto.biz/sa/downloads/mp3/yt_${videoInfo.videoId})`, true)
                            embed.addField("Views", short(videoInfo.views), true)
                            embed.addField("Likes/Dislikes", `👍 **${short(videoInfo.likeCount)}** / 👎 **${short(videoInfo.dislikeCount)}**`, true)
                            embed.setColor("RED")
                            embed.setImage(videoInfo.thumbnailUrl)
                        }
                        message.channel.stopTyping(true);
                        message.channel.send(embed)
    })
}

if(mess.startsWith(prefix+"stop") || mess.startsWith(prefix+"اطلع")) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if(guilds[message.guild.id].isPlaying) guilds[message.guild.id].dispatcher.end();
    if (guilds[message.guild.id].voiceChannel)
    { 
    await clear()
    message.guild.voiceConnection.disconnect();
    message.channel.send(`**:mailbox_with_no_mail: Successfully disconnected!**`)
    }
}

if(mess.startsWith(prefix+"stfu") || message.content.startsWith(`<@${client.user.id}> stfu`)) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if(guilds[message.guild.id].isPlaying) guilds[message.guild.id].dispatcher.end();
    if (guilds[message.guild.id].voiceChannel)
    { 
    await clear()
    message.guild.voiceConnection.disconnect();
    message.channel.send(`:cry: k sempai!`)
    }
}

if(message.content.startsWith(prefix+"search")) {
    let index = 0
    if(!args) return message.channel.send(`:x: You didn't enter a query!`)
    const videos = await youtube.searchVideos(args, 5)
    message.channel.send(`**${yt} Search Results for \`\`${args}\`\`**`,{embed: {
    description: `**__Song Selection__** Type the number of the song or do **cancel** to cancel!\n\n${videos.map(song =>`**${++index}. [${song.title}](${song.url})**`).join('\n')}`,
    footer: {
        text: `Requested by ${message.author.username} (${message.author.id})`,
        icon_url: message.author.avatarURL
    }
    }})
try {
var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11 || msg2.content === 'cancel' || msg2.content.startsWith("m-search") && msg2.author.id === message.author.id, {
    maxMatches: 1,
    time: 30000,
    errors: ['time'],
});
} catch (error) {
return message.channel.send(`**:x: Timeout**`) 
}
if(guilds[message.guild.id].queue.length > 100) return message.channel.send(``, {embed: {
    description: `🔒 Sorry, max queue length is 100, do **${prefix}clear** to clear entire queue or **${prefix}clear <number>** to clear 1 item`
}})
if(!message.member.voiceChannel) return;
if(response.first().content === 'cancel') return message.channel.send(`Alright, I've **cancelled** this opreation.`)
if(response.first().content === 'm-search') return;
const videoIndex = parseInt(response.first().content)
const voiceChannel = message.member.voiceChannel
const permissions = voiceChannel.permissionsFor(message.client.user)
if (!permissions.has('CONNECT')) return message.channel.send({embed: {description: "🛑 I don't have permission to CONNECT! Give me some."}});
if (!permissions.has('SPEAK')) return message.channel.send({embed: {description: "🛑 I don't have permission to SPEAK! Give me some."}});    
const id = videos[videoIndex - 1].id;
message.delete();
if(!guilds[message.guild.id].queue[0] || !guilds[message.guild.id].isPlaying) {
fetchVideoInfo(id, function(err, videoInfo) {
if (err) throw new Error(err);
if(videoInfo.duration > 1800) return message.channel.send(`**${message.author.username}, :x: Cannot play a video that's longer than 30 minutes**`).then(message.react(nope));
if(!message.member.voiceChannel) return message.channel.send(novc); 
else message.react(correct)
playMusic(id, message);
guilds[message.guild.id].isPlaying = true;
guilds[message.guild.id].queue.push(id);
guilds[message.guild.id].queueNames.push(videos[videoIndex - 1].title);
message.channel.send(`Playing :notes: **\`\`${videos[videoIndex - 1].title}\`\`** ― Now!`);
});
} else {
        fetchVideoInfo(`${id}`, function(err, videoInfo) {
            if (err) throw new Error(err);
            if(videoInfo.duration > 1800) return message.channel.send(`**${message.author.username}, :x: Cannot play a video that's longer than 30 minutes**`).then(message.react(nope));
            else message.react(correct)
            add_to_queue(id, message);
            message.channel.send(new RichEmbed()
            .setAuthor("Added to queue", message.author.avatarURL)
            .setTitle(videoInfo.title)
            .setURL(videoInfo.url)
            .addField("Channel", videoInfo.owner, true)
            .addField("Duration", convert.fromS(videoInfo.duration, 'mm:ss') , true)
            .addField("Published at", videoInfo.datePublished, true)
            .addField("Postion in queue", guilds[message.guild.id].queueNames.length, true)
            .setColor("RED")
            .setThumbnail(videoInfo.thumbnailUrl)
            )
            guilds[message.guild.id].queueNames.push(videoInfo.title);
        });
}
    }


else if (mess.startsWith(prefix + 'vol') || mess.startsWith(prefix + "volume")|| mess.startsWith(prefix+"صوت")) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if (!guilds[message.guild.id].isPlaying) return message.channel.send("**:x: Nothing playing in this server**")
    if(!args) return message.channel.send(`**:loud_sound: Current Volume:** ${guilds[message.guild.id].dispatcher.volume*100}`)
    if(isNaN(args)) return message.channel.send(`**:x: Volume must be a number -_-**`)
    if (args > 200) return message.channel.send('**:headphones: For some health reasons the max vol you can use is ``200``, kthx**');
    if (args < 1) return message.channel.send("**:headphones: you can set volume from ``1`` to ``200``**");
    guilds[message.guild.id].dispatcher.setVolume((0.01 * parseInt(args)))
    guilds[message.guild.id].volume = 0.01 * parseInt(args)
    message.channel.send(`**:loud_sound: Volume:** ${guilds[message.guild.id].dispatcher.volume*100}`);
}


else if (mess.startsWith(prefix + 'pause') || mess.startsWith(prefix+"وقف")) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if(guilds[message.guild.id].isPlaying !== true || !guilds[message.guild.id].queue[0]) return message.channel.send(`**:x: Nothing playing in this server**`)
    if (guilds[message.guild.id].dispatcher.paused === true) return message.channel.send("*:hash: Already paused*")
    message.channel.send(':pause_button: **Paused**').then(() => {
        guilds[message.guild.id].dispatcher.pause(false);
    });
}

else if (mess.startsWith(prefix + 'resume') || mess.startsWith(prefix+"كمل")) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if (guilds[message.guild.id].dispatcher.paused === false) return message.channel.send("*:hash: Nothing to resume.*")
    message.channel.send(':play_pause: **Resuming**').then(() => {
        guilds[message.guild.id].dispatcher.resume();
    });
}


//? ONE ITEM WORKS, BUT QUEUE NO... ==> QUEUE LOOP SYSTEM IN 2.0

else if (mess.startsWith(prefix + 'loop') || mess.startsWith(prefix+"عيد")) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if (!guilds[message.guild.id].isPlaying) return message.channel.send("**:x: Nothing playing in this server**")
    if(guilds[message.guild.id].loop === true) {
        message.channel.send(`:arrow_right_hook: **Looping Disabled**`)
        guilds[message.guild.id].loop = false;        
        return;
    } else if(guilds[message.guild.id].loop === false) {
    guilds[message.guild.id].loop = true;
    message.channel.send(':repeat_one: **Looping Enabled!**')
    return;
    }
    
} 
/* else if(mess.startsWith(`${prefix}shuffle`)) {
//     if(!guilds[message.guild.id].queue[2]) return message.channel.send(`:x: It seems you can't do that right now.`)
//     shuffle(guilds[message.guild.id].queue.slice(1) , guilds[message.guild.id].queueNames.slice(1))
//     message.channel.send(`:twisted_rightwards_arrows: Queue shuffled.`)
}*/
else if (mess.startsWith(prefix + 'join') || mess.startsWith(prefix+"ادخل")) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if(!guilds[message.guild.id].isPlaying && guilds[message.guild.id].queueNames.length <= 0) {
        message.member.voiceChannel.join().then(message.react(correct));
        message.channel.send(`**:page_facing_up: Queue moved to \`\`${message.member.voiceChannel.name}\`\`**`)
    } else {
        message.channel.send(`<:megX:476797393283710991> **Music is being played in another voice channel!**`)
    }
}

else if (mess.startsWith(prefix + 'clear') || mess.startsWith(prefix+"نظف")) {
    if (!message.member.voiceChannel) return message.channel.send(novc);
    if(!guilds[message.guild.id].queueNames[0] || !guilds[message.guild.id].isPlaying) return message.channel.send(`**:x: Nothing playing in this server**`)
   if(guilds[message.guild.id].queueNames.length > 1) {
    if(!args || isNaN(args) && args != 0) {
    guilds[message.guild.id].queueNames.splice(1, guilds[message.guild.id].queueNames.length)
    guilds[message.guild.id].queue.splice(1, guilds[message.guild.id].queue.length)
    message.channel.send(`:asterisk: Cleared the queue of **${message.guild.name}**`)
    } else if(args > 0) {
        const removedsong = guilds[message.guild.id].queueNames[parseInt(args)]
        if(!removedsong) return message.channel.send(`:x: **No such item, or item doesn't exist!**`)
        guilds[message.guild.id].queueNames.splice(parseInt(args), 1)
        guilds[message.guild.id].queue.splice(parseInt(args), 1)
        return message.channel.send(`:wastebasket: Removed **${removedsong}** from the queue.`);}
   } else if(guilds[message.guild.id].queueNames.length <= 1 ) {
       message.channel.send(`<:megX:476797393283710991> There's only 1 item in the queue. use \`\`${prefix}skip\`\` instead! `)
   }
}
});



//
async function skip_song(message) {
  await guilds[message.guild.id].dispatcher.end();
}

async function playMusic(id, message) {
    guilds[message.guild.id].voiceChannel = message.member.voiceChannel;
    guilds[message.guild.id].voiceChannel.join().then(function(connection) {
        if(!isYoutube(id) && id.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi)) {
            stream = id
        } else {
        stream = ytdl("https://www.youtube.com/watch?v=" + id, {
            filter: 'audioonly',
            quality: 'highestaudio',
            audioEncoding: "opus"
        })};
        guilds[message.guild.id].skipReq = 0;
        guilds[message.guild.id].skippers = [];
        guilds[message.guild.id].dispatcher = connection.playStream(stream, {bitrate: "auto", volume: guilds[message.guild.id].volume})
        guilds[message.guild.id].dispatcher.on('end', async function() {
            guilds[message.guild.id].skipReq = 0;
            guilds[message.guild.id].skippers = [];
           if(guilds[message.guild.id].loop === true) return playMusic(guilds[message.guild.id].queue[0], message)
           else                      
           await guilds[message.guild.id].queue.shift();
           await guilds[message.guild.id].queueNames.shift();
            if (guilds[message.guild.id].queue.length === 0) {
                guilds[message.guild.id].queue = [];          
                guilds[message.guild.id].queueNames = [];
                guilds[message.guild.id].isPlaying = false;
                setTimeout(function() {
                if(guilds[message.guild.id].voiceChannel !== null) return;
            }, 1000)
            } else {
                setTimeout(async function() {
                    if(!guilds[message.guild.id].queueNames || guilds[message.guild.id].queueNames[0] == undefined) return;
                    await playMusic(guilds[message.guild.id].queue[0], message);
                   message.channel.send(`Playing :notes: **\`\`${guilds[message.guild.id].queueNames[0]}\`\`** ― Now!`)
                }, 500);
            }
        });
        guilds[message.guild.id].dispatcher.on('error', function(error) {
          return message.channel.send(`<:megErrOr:475075170231517184> An error occurd! \`\`\`${error}\`\`\``)
        });
    });
}



async function getID(str, cb) {
    if (isYoutube(str)) {
         const video = await youtube.getVideo(str)
         cb(video.raw.id);
    } else {
        const video = await youtube.searchVideos(str, 1)
        if(!video) return cb(null); 
        cb(video.map(m => m.id).toString());
    }
}

function add_to_queue(strID, message) {
    if (isYoutube(strID)) {
        guilds[message.guild.id].queue.push(getYouTubeID(strID));
    } else {
        guilds[message.guild.id].queue.push(strID);
    }
}

//! DEPRCATED V
// function search_video(query, callback) {
//     request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
//         var json = JSON.parse(body);
//         if (!json.items[0]) callback("3_-a9nVZYjk");
//         else {
//             callback(json.items[0].id.videoId);
//         }
//     });
// }
function isYoutube(str) {
    return str.toLowerCase().indexOf("youtube.com") > -1 || str.toLowerCase().indexOf("youtu.be") > -1;
}

// function shuffle(a, b) {
//     for (var i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//         [b[i], b[j]] = [b[j], b[i]];
//     }
//     return a, b;
// }
////////////////
