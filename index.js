const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos



client.on("ready", () => {
  
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
 
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  
  if(message.author.bot) return;
  
  
  if(!message.content.startsWith(config.prefix)) return;
  
 
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  
  if(command === "ping") {
   
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    
    const sayMessage = args.join(" ");
    
    message.delete().catch(O_o=>{}); 
    
    message.channel.send(sayMessage);
  }
  

  
  if(command === "purge") {
 
    const deleteCount = parseInt(args[0], 10);
    
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
   
    const fetched = await message.channel.messages.fetch({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

    if(command === "moeda") {
   

        var array1 = ["cara", "coroa"];

  var rand = Math.floor(Math.random() * array1.length);

  if (!args[0] || (args[0].toLowerCase() !== "cara" && args[0].toLowerCase() !== "coroa")) {
    message.reply("insira **cara** ou **coroa** na frente do comando.");
  } 
else if (args[0].toLowerCase() == array1[rand]) {
    message.channel.send("Deu **" + array1[rand] + "**, você ganhou dessa vez!");
  } 
else if (args[0].toLowerCase() != array1[rand]) {
    message.channel.send("Deu **" + array1[rand] + "**, você perdeu dessa vez!"
    );
  }
    }

    if(command === "reaction") {
      let embed = new Discord.MessageEmbed()
      .setTitle('Cargos por reação')
      .setDescription("Neste canal você pode selecionar vários cargos, Clique na reação e você receberá esse cargo automaticamente!\n\n :soccer:HaxBall\n\n➣ Se você deseja entrar em um chat exclusivo de fãs de HaxBall, clique / toque na reação :soccer:  abaixo.\n\n:zap:Pokemon\n\n➣ Se você gosta de Pokémon e quer fazer batalhas, clique / toque na reação:zap:  abaixo.")
      .setColor('RED')
      let msgEmbed = await message.channel.send(embed)
      msgEmbed.react('⚡')
      msgEmbed.react('⚽')

        
    }


});

client.on("messageReactionAdd", async (reaction, user) => {
  if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reation.fetch();

  if(user.bot) return;
  if(!reaction.message.guild) return;

  if(reaction.message.channel.id === "699952367600402443"){
    if(reaction.emoji.name === '🟥'){
      await reaction.message.guild.members.cache.get(user.id).roles.add("737421205572812840");
    }
  }
  if(reaction.message.channel.id === "699952367600402443"){
    if(reaction.emoji.name === '🟪'){
      await reaction.message.guild.members.cache.get(user.id).roles.add("737421205572812840");
    }
  }
  if(reaction.message.channel.id === "712018809153781892"){
    if(reaction.emoji.name === '⚡'){
      await reaction.message.guild.members.cache.get(user.id).roles.add("737421205572812840");
    }
  }
  if(reaction.message.channel.id === "712018809153781892"){
    if(reaction.emoji.name === '⚽'){
      await reaction.message.guild.members.cache.get(user.id).roles.add("737351078600900729");
    }
  }
})

client.on("messageReactionRemove", async (reaction, user) => {
  if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reation.fetch();

  if(user.bot) return;
  if(!reaction.message.guild) return;

  if(reaction.message.channel.id === "712018809153781892"){
    if(reaction.emoji.name === '🟥'){
      await reaction.message.guild.members.cache.get(user.id).roles.remove("737421205572812840");
    }
  }
    if(reaction.message.channel.id === "712018809153781892"){
    if(reaction.emoji.name === '🟪'){
      await reaction.message.guild.members.cache.get(user.id).roles.remove("737421205572812840");
    }
  }
  if(reaction.message.channel.id === "712018809153781892"){
    if(reaction.emoji.name === '⚡'){
      await reaction.message.guild.members.cache.get(user.id).roles.remove("737421205572812840");
    }
  }
  if(reaction.message.channel.id === "712018809153781892"){
    if(reaction.emoji.name === '⚽'){
      await reaction.message.guild.members.cache.get(user.id).roles.remove("737351078600900729");
    }
  }
})

client.login(process.env.TOKEN); 
