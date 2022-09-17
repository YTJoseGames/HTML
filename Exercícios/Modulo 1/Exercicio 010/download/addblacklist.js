const {Message, MessageEmbed, Client} = require('discord.js')
const db = require('quick.db')
const emoji = require("../../utils/emojis.js")
const moment = require("moment")
moment.locale("pt-br")

module.exports = {
name: "addblacklist",
block: true,

run: async (client, message, args) => {

if (!['434791887241740288'].includes(message.author.id)) return;

let motivo = args.slice(1).join(" ")
let data = `${moment(message.createdAt).format('LLL')}`

try {
var member = message.mentions.users.first() || await message.guild.members.cache.get(args[0]) || await client.users.fetch(args[0]) 
} catch {
const embed1 = new MessageEmbed()
.setTitle(`<a:coroa2:853347152944168970> Moderação | Owner`)
.setDescription(`O Usuário informado não foi encontrado em meu cache, caso o id exista irei adiciona-lo em meu cache e em alguns segundos tente novamente!`)
.setColor('#2F3136')
.setFooter({ text: `• July™ Owner`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`})
return message.reply({ embeds: [embed1]})
}

if(!args[0]) {
const embed2 = new MessageEmbed()
.setTitle(`<a:coroa2:853347152944168970> Moderação | Owner`)
.setDescription(`Informe um ID ou Mencione um usuário para ser adicionado a blacklist`)
.setColor('#2F3136')
.setFooter({ text: `• July™ Owner`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`})
return message.reply({ embeds: [embed2]})
}

if(!motivo) {
const embed3 = new MessageEmbed()
.setTitle(`<a:coroa2:853347152944168970> Moderação | Owner`)
.setDescription(`Informe um motivo para a punição ser aplicada ao usuário.`)
.setColor('#2F3136')
.setFooter({ text: `• July™ Owner`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`})
return message.reply({ embeds: [embed3]})
}

const embed4 = new MessageEmbed()
.setTitle(`<a:coroa2:853347152944168970> Moderação | Owner`)
.setDescription(`**${member}** Foi adicionado a Bot Blacklist em **${data}** pelo motivo: **${motivo}**`)
.setColor('#2F3136')
.setFooter({ text: `• July™ Owner`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`})
message.reply({ embeds: [embed4]})

db.set(`botblacklist_${member.id}`, true)
db.set(`botblacklistmotivo_${member.id}`, `${motivo}`)
db.set(`botblacklistdata_${member.id}`, `${data}`)

}
}
    

