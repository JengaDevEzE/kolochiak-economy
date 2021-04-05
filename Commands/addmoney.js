const db = require('quick.db');

module.exports = {
    name: 'addmoney',
    description: 'A way to gain money from the owners/admins/bot owners of the server.',
    aliases: ['addm', 'am'],
    cooldown: 5,
    execute(message, args) {

        if (!message.member.roles.cache.some(r=>["Administrator", "Owners", "Owner", "Testers"].includes(r.name))) {
            return message.channel.send('You do not have permissions to run this!')
        }

        const profiles = new db.table('profiles')
        const member = message.mentions.members.first() || message.member
        const memberProfile = profiles.get(`profiles_${member.id}`)

        if (!memberProfile) {
            return message.channel.send('This user does not have a profile \n Please tell the user to create a profile in order to recieve their cash!')
        }

        if (!args[1]) {
            return message.channel.send('You need to specify how much money you will give the user!')
        }

        if (isNaN(args[1]) || args[1] < 1) {
            return message.channel.send('You need to add a currency that is at least 1!')
        }

        profiles.add(`profiles_${member.id}.money`, args[1])
        return message.channel.send(`Added ⁂${args[1].toLocaleString()} to ${member}`)
    }
}