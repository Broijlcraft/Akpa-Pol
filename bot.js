const discord = require('discord.js');
var client = new discord.Client();

//process.env variables are available through the Heroku control panel

client.on('ready', ()=>{
    if(1!==2)return;
    setInterval(function() {
        currentDate = new Date();
        var day_ = currentDate.getDay();
        var hour_ = currentDate.getHours();
        var minute_ = currentDate.getMinutes();
        if(day_ > 0){
            if(day_ < 6) {
                if(hour_ === 0 && minute_ === 1){
                    client.channels.get(process.env.SURVEY_CHANNEL).send('@everyone');
                        client.channels.get(process.env.SURVEY_CHANNEL).send({embed: {
                            color: 15844367,
                            title: process.env.TITLE_CHECKIN,
                                fields: [
                                    //OP = Option
                                    { name: process.env.OP_NAME_CHECKIN_1, value: process.env.OP_VALUE_CHECKIN_1, inline: true},
                                    { name: process.env.OP_NAME_CHECKIN_2, value: process.env.OP_VALUE_CHECKIN_2, inline: true}
                                ]
                            }
                        }).then(sentEmbed => {
                            // EMT = discord emote, copy from discord using \:smile: in chat to get 😄
                            sentEmbed.react(process.env.OP_EMT_CHECKIN_1),
                            sentEmbed.react(process.env.OP_EMT_CHECKIN_2)
                        });            
                        client.channels.get(process.env.RESULTS_CHANNEL).send({embed: {
                            color: 15844367,
                            title: process.env.TITLE_CHECKIN_RESULTS
                            }
                        })
                    }    
                    if(hour_ === 9 && minute_ === 58){
                        client.channels.get(process.env.SURVEY_CHANNEL).send('@everyone');
                        client.channels.get(process.env.SURVEY_CHANNEL).send({embed: {
                            color: 15844367,
                            title: process.env.TITLE_CHECKOUT,
                                fields: [
                                    { name: process.env.OP_NAME_CHECKOUT_1, value: process.env.OP_VALUE_CHECKOUT_1, inline: true},
                                    { name: process.env.OP_NAME_CHECKOUT_2, value: process.env.OP_VALUE_CHECKOUT_2, inline: true}
                                ]
                            }
                        }).then(sentEmbed => {
                            sentEmbed.react(process.env.OP_EMT_CHECKOUT_1),
                            sentEmbed.react(process.env.OP_EMT_CHECKOUT_2)
                        });
                        client.channels.get(process.env.RESULTS_CHANNEL).send({embed: {
                            color: 15844367,
                            title: process.env.TITLE_CHECKOUT_RESULTS
                        }
                    })
                } 
            }
        }
    }, 60000);
});

client.on('messageReactionAdd', (reaction, user)=>{
    if(1!==2)return;
    if(user.bot)return 
    if(reaction.message.channel.id === process.env.SURVEY_CHANNEL) {
        currentDate = new Date();
        var day_ = currentDate.getDay();
        var hour_ = currentDate.getHours();
        var minute_ = currentDate.getMinutes();
        if(day_ > 0){
            if(day_ < 6){
                hour_ = hour_ + 7;
                client.channels.get(process.env.RESULTS_CHANNEL).send({embed: {
                    color: 15844367,
                    title: process.env.TITLE_ROLE_DESCRIPT,
                    fields: [
                            { name: process.env.RESP_NAME, value: process.env.RESP_USERPREFX + user.username + process.env.RESP_REACTPREFX  + reaction.emoji.name + process.env.RESP_TIMEPREFX + hour_ + ':' + minute_ , inline: false},
                        ]
                    }
                });
            }
        }
    }
})

client.login(process.env.BOT_TOKEN);