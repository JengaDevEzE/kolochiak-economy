const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
require('dotenv').config()

client.commands = new Discord.Collection()
client.cooldowns = new Discord.Collection()

const commandFiles = fs.readdirSync('./Commands').filter(f => f.endsWith('.js'))
    for(const file of commandFiles) {
        const command = require(`./Commands/${file}`)
        client.commands.set(command.name, command)
    }

fs.readdir('./Events/', (err, files) => {
    if (err) return console.log(err)
    files.forEach(file => {
    if (!file.endsWith('.js')) return

        const event = require(`./Events/${file}`)
        const eventName = file.split(".")[0]

    client.on(eventName, event.bind(null, client))
    delete require.cache[require.resolve(`./Events/${file}`)]
    })
})

client.login(process.env.TOKEN)