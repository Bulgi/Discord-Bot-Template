const botConfig = require("./botconfig.json");
const Discord = require ("discord.js");
const fs = require("fs");
const prefix = botConfig.prefix;
const bot = new Discord.Client({disabledEveryone: true});
bot.commands = new Discord.Collection();


fs.readdir("./cmds/",(err,files) => {
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0){
    console.log("No Commands to load!");
    return;
  }
  console.log(`Loading ${jsfiles.length} commands!`);
  jsfiles.forEach((f,i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i + 1}: ${f} loaded!`);
    bot.commands.set(props.help.name,props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is ready!`);
  console.log(bot.commands);
});


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  if(!command.startsWith(prefix)) return;

  let cmd = bot.commands.get(command.slice(prefix.length).toLowerCase());
  if(cmd) cmd.run(bot, message, args);

});

bot.login(botConfig.token)
