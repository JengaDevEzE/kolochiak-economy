const db = require('quick.db');

module.exports = {
    name: 'removemoney',
    description: 'Removes a specific ammount of money from the user.',
    aliases: ['removem', 'rm', 'rmoney'],
    cooldown: 3,
    execute(message, args) {

        if (!message.member.roles.cache.some(r=>["Administrator", "Owners", "Owner", "Testers"].includes(r.name))) {
            return message.channel.send('You do not have permissions to run this!')
        }

        const profiles = new db.table('profiles')
        const member = message.mentions.members.first() || message.member
        const memberProfile = profiles.get(`profiles_${member.id}`)

        if (!memberProfile) {
            return message.channel.send('This user does not have a profile to remove cash from.')
        }

        if (!args[1]) {
            return message.channel.send('You need to specify how much money you will remove from the user!')
        }

        if (isNaN(args[1]) || args[1] < 1) {
            return message.channel.send('You need to add a currency that is at least 1!')
        }

        const oldBal = profiles.get(`profiles_${member.id}.money`, args[1])

        if (oldBal - args[1] < 1) {
            return message.channel.send('I can\'t remove that much from that user!')
        }

        profiles.subtract(`profiles_${member.id}.money`, args[1])
        return message.channel.send(`Removed ⁂${args[1].toLocaleString()} from ${member}.`)
    }
}