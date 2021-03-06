const config = require("../config.json"); //initialize config.json
const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    name: 'announce',
    description: 'sends an announcement to @everyone in target channel',

    execute(msg, args){
        if (!msg.member.hasPermission('ADMINISTRATOR')) {
            return msg.channel.send('missing permissions')
        }

        let targetChannel = msg.mentions.channels.first();
        let targetChannelID = targetChannel.id;
        let burn = args.shift();
        let message = args.join(' ')

        const { guild } = msg;

        const target = guild.channels.cache.find((target) => {
            return target.id === targetChannelID;
        });

        if(!target){
            if (config.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Yikes...") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription("No target channel found...") //main text body
                    .setFooter(config.footer) //footer/watermark
                return msg.channel.send(embed);
            }
        } else if(!message){
            if (config.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Yikes...") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription("There was no message!") //main text body
                    .setFooter(config.footer) //footer/watermark
                return msg.channel.send(embed);
            }
        } else {
            if (config.embeds === true) { //Checks if the embed option is true then creates and sends this embed 
                let embed = new Discord.MessageEmbed() //sets send card message
                    .setAuthor("Hey!") // Header of card
                    .setColor("#486dAA") //Side bar color
                    .setDescription(`@everyone ${message}`) //main text body
                return target.send(embed);
            }
        }
    }
}