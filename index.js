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
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(!message.content.startsWith(config.prefix)) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  

  
  if(command === "purge") {
   // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
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