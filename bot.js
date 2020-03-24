const discord = require('discord.js');
var client = new discord.Client();

client.on('ready', ()=>{
    console.log('online');
});

client.on('message',message => {
     if (message.author.bot) return;
     if (message.content.toLowerCase().includes('ping')){
         //message.reply('Pong!');
        currentDate = new Date();
         //client.channels.get('692070737900470323').send('🕔');
         client.channels.get('692070737900470323').send(Date(1489199400000));
     }
});

client.login(process.env.BOT_TOKEN);
