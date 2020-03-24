const discord = require('discord.js');
var client = new discord.Client();

client.on('ready', ()=>{
    console.log('online');
    client.channels.get('692070737900470323').send('@everyone de les begint');
});

client.on('message',message => {
     if (message.author.bot) return;
     if (message.content.toLowerCase().includes('ping')){
         message.reply('Pong!');
     }
});

client.login(process.env.BOT_TOKEN);
