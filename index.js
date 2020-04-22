const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require('ms');

const PREFIX = '.';

// welcome
bot.on('guildMemberAdd', member=>{
   const channel = member.guild.channels.cache.find(channel => channel.name == "Welcome");
   if(!channel){
      return;
   }
   member.roles.add(message.guild.roles.cache.find(role => role.name === "Member").id);
   channel.send('Welcome back, '+ member +'-sama!');
});

// message
bot.on('message', message=>{

  let args = message.content.substring(PREFIX.length).split(" ");

  switch(args[0]){
         case 'Natsume':
            message.channel.send('Pure and the best girl!');
         break;

         case 'Nayu':
            message.channel.send('<:NayuPeek:681835160966004786>');
         break;
         case 'mute':

            if(!message.member.roles.cache.find(role => role.name === "Natsume Best Girl")){
               return message.reply("you don't have permissons to do this!");
            }
            else{
               let person = message.guild.member(message.mentions.users.first());
               if(!person) return;
               
               let memberrole = message.guild.roles.cache.find(role => role.name === "Member");
               let muterole = message.guild.roles.cache.find(role => role.name === "mute");
               if(!muterole) return;
   
               let time = args[2];
               if(!time) return message.reply("Please set time to mute this person!");
   
               person.roles.add(muterole.id);
               person.roles.remove(memberrole.id);
               message.channel.send(`@${person.user.tag} has been muted for ${ms(ms(time))}`);
               
               setTimeout(function(){
                  person.roles.remove(muterole.id);
                  person.roles.add(memberrole.id);
               },ms(time));
            }
            
         break;
  }

  if(message.content.includes('Itsuki') == true){
       message.react('<:ItsukiHands:669714057355591702>');
  }
});



bot.on('ready', () =>{
   console.log('Natsume-sama, okaeri!');
   bot.user.setActivity('with Natsume-sama',{type: 'PLAYING'}).catch(console.error);
})



bot.login(process.env.BOT_TOKEN);
