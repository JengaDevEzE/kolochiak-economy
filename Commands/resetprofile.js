const db = require('quick.db');

module.exports = {
    name: 'resetprofile',
    description: 'Reset your current profile',
    aliases: ['resetprof', 'rp'],
    cooldown: 3,
    async execute(message) {
        const profiles = new db.table("profiles")

        const userProfile = profiles.get(`profiles_${message.author.id}`)
        if (userProfile == null) return message.channel.send('You don\'t currently have a profile!')

        const msg = await message.channel.send('Are you sure you wish to delete your profile?')
        await msg.react('✅')
        await msg.react('❌')

        const filter = (reaction, user) => {
            return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === message.author.id
        }

        msg.awaitReactions(filter, { max: 1, time: 6000, errors: ['time'] })
            .then(reaction => {
                if (reaction.first().emoji.name === '✅') {
                    profiles.delete(`profiles_${message.author.id}`)
                    return message.channel.send('Your profile has been successfully deleted and reset. \n Please use the command `!newprofile` to create a new one and start again!')
                } else if (reaction.first().emoji.name === '❌') {
                    return message.channel.send('Canceling profile reset prompt.')
                }
            })
            .catch(() => {
                return message.channel.send('Canceling prompt due to inactivity on this prompt.')
            }
        )
    }
}