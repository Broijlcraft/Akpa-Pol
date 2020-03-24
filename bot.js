const discord = require('discord.js');
var client = new discord.Client();

const token = 'NjkxNjUzMzI4MDAxNjk1NzQ0.XnjGbg.i79JcvEOHxc9aBTmNsH8N94QnqA';

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
