const Discord = module.require("discord.js");

module.exports.run = async (bot,message,args) => {

    let help = new Discord.MessageEmbed()
  .setColor("#dc322f")
  .setTitle ("Help")
  .setDescription ("Template for disord made in discord.js by Bulgi#0002")

         message.channel.send(help);
}
module.exports.help = {
  name: "help"
}
