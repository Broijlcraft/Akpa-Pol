const discord = require('discord.js');
var client = new discord.Client();

client.on('ready', ()=>{        
    setInterval(function() {
        currentDate = new Date();
        var hour_ = currentDate.getHours();
        var minute_ = currentDate.getMinutes();
        if(hour_ === 00 && minute_ === 45){
            client.channels.get('692019853598392340').send('@everyone');
            client.channels.get('692019853598392340').send({embed: {
                color: 15844367,
                title: "Click emoji pada waktu Check-in. Paling cepat 15 menit sebelum Jam kerja:",
                    fields: [
                        { name: "Click reaction", value: "🅰️    Untuk AKPA", inline: true},
                        { name: "Click reaction", value: "🇵    Untuk Polaris ", inline: true}
                    ]
                }
            }).then(sentEmbed => {
                sentEmbed.react('🅰️'),
                sentEmbed.react('🇵')
            });            
            client.channels.get('692133614363738184').send({embed: {
                color: 15844367,
                title: "Check-in:"
                }
            })
        }    
        if(hour_ === 09 && minute_ === 45){
            client.channels.get('692019853598392340').send('@everyone');
            client.channels.get('692019853598392340').send({embed: {
                color: 15844367,
                title: "Click emoji pada waktu Check-out:",
                    fields: [
                        { name: "Click reaction", value: "🅰️   Untuk AKPA", inline: true},
                        { name: "Click reaction", value: "🇵    Untuk Polaris ", inline: true}
                    ]
                }
            }).then(sentEmbed => {
                sentEmbed.react('🅰️'),
                sentEmbed.react('🇵')
            });
            client.channels.get('692133614363738184').send({embed: {
                color: 15844367,
                title: "Check-out:"
                }
            })
        }    
    }, 60000);
});

client.on('messageReactionAdd', (reaction, user)=>{
    if(user.bot)return
    console.log(user.username + " reacted with " + reaction.emoji.name + " " + reaction.count);
    currentDate = new Date();
    var hour_ = currentDate.getHours();
    var minute_ = currentDate.getMinutes();
    client.channels.get('692133614363738184').send(user.username + " reacted with " + reaction.emoji.name + " at " + hour_ +':'+ minute_);
})

client.on("message", message => {
    if(message.author.bot)return
    if(message.content.toLocaleLowerCase().includes('test')){
        client.channels.get('692133614363738184').send("Test complete!");
    }
})

client.login(process.env.BOT_TOKEN);
