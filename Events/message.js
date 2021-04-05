const Discord = require('discord.js');
const prefix = process.env.PREFIX

module.exports = (client, message) => {
    if (!message.content.startsWith(prefix)) return
    if (message.author.bot) return
    if (message.channel.type == 'dm') return message.channel.send('**Commands can\'t be run in Direct Messages.**')

    const args = message.content.substring(prefix.length).split(" ")
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]))

    if (!command) return

    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection())
    }

    const now = Date.now()
    const timeStamps = client.cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 0) * 1000

    if (timeStamps.has(message.author.id)) {
    const expirationDate = timeStamps.get(message.author.id) + cooldownAmount

        if (now < expirationDate) {
            const timeLeft = (expirationDate - now) / 1000
            return message.channel.send(`Please wait ${timeLeft.toFixed(1)} before using the ${command.name} command.`)
        }
    }

    timeStamps.set(message.author.id, now)
    setTimeout(() => timeStamps.delete(message.author.id), cooldownAmount)

    try {
        command.execute(message, args, client)
    } catch (error) {
        console.log(error)
        return message.channel.send('There was an error executing this command. \n **Please DM the bot owner for assistance.**')
    }
}