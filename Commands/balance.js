const db = require('quick.db');

module.exports = {
    name: 'balance',
    description: 'Check your profile\'s balance',
    aliases: ['b', 'bal'],
    cooldown: 2,
    execute(message, args) {
        const profiles = new db.table('profiles')
        const member = message.mentions.members.first() || message.member
        const memberProfile = profiles.get(`profiles_${member.id}`)

        if (!memberProfile) {
            return message.channel.send('This user does not have a profile!')
        }

        const bal = profiles.get(`profiles_${member.id}.money`) || 0
        return message.channel.send(`${member} has ⁂${bal.toLocaleString()}`)
    }
}