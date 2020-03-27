const discord = require('discord.js');
var client = new discord.Client();

client.on('ready', ()=>{       
setInterval(function() {
    currentDate = new Date();
    var day_ = currentDate.getDay();
    var hour_ = currentDate.getHours();
    var minute_ = currentDate.getMinutes();
    if(day_ < 6){
        if(hour_ === 0 && minute_ === 1){
            client.channels.get(process.env.SURVEY_CHANNEL).send('@everyone');
                client.channels.get(process.env.SURVEY_CHANNEL).send({embed: {
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
                client.channels.get(process.env.RESULTS_CHANNEL).send({embed: {
                    color: 15844367,
                    title: "Check-in:"
                    }
                })
            }    
            if(hour_ === 9 && minute_ === 58){
                client.channels.get(process.env.SURVEY_CHANNEL).send('@everyone');
                client.channels.get(process.env.SURVEY_CHANNEL).send({embed: {
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
                client.channels.get(process.env.RESULTS_CHANNEL).send({embed: {
                    color: 15844367,
                    title: "Check-out:"
                    }
                })
            } 
        }
    }, 60000);
});

client.on('messageReactionAdd', (reaction, user)=>{
    if(user.bot)return 
    if(reaction.message.channel.id === process.env.SURVEY_CHANNEL) {
        console.log(user.username + " reacted with " + reaction.emoji.name + " " + reaction.count);
        currentDate = new Date();
        var hour_ = currentDate.getHours();
        var minute_ = currentDate.getMinutes();
        hour_ = hour_ + 7;
        client.channels.get(process.env.RESULTS_CHANNEL).send({embed: {
            color: 15844367,
            title: "Employee:",
            fields: [
                    { name: "Info", value: "Name: " + user.username + "\nReaction: " + reaction.emoji.name + "\nTime: " + hour_ + ':' + minute_ , inline: false},
                ]
            }
        });
    }
})

client.on("message", message => {
    if(message.author.bot){return}
        if(message.channel.id === process.env.BOT_TEST_SURVEY_CHANNEL){
            if(message.content.toLocaleLowerCase().includes('test')){   
                client.channels.get(process.env.BOT_TEST_SURVEY_CHANNEL).send('@everyone');
                client.channels.get(process.env.BOT_TEST_SURVEY_CHANNEL).send({embed: {
                    color: 15844367,
                    title: "Click emoji pada waktu Check-out:",
                    fields: [
                        { name: "Click reaction", value: "🅰️   Untuk AKPA", inline: true},
                        { name: "Click reaction", value: "🇵    Untuk Polaris ", inline: true}
                    ]
                }
                }).then(sentEmbed => {sentEmbed.react('🅰️'),sentEmbed.react('🇵')});
                client.channels.get(process.env.BOT_TEST_RESULTS_CHANNEL).send(process.env.LOW_KEY);            
            };
        }
    }
)

client.login(process.env.BOT_TOKEN);
