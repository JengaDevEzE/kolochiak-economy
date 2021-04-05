const db = require('quick.db');

module.exports = {
    name: 'newprofile',
    description: 'Adds a new profile to the database.',
    aliases: ['np', 'newprof'],
    cooldown: 3,
    execute(message) {
        const profiles = new db.table("profiles")

        const userProfile = profiles.get(`profiles_${message.author.id}`)

        if (userProfile) return message.channel.send('You already have a profile!')

        message.channel.send('Send a message of your profile name.')

        const filter = (user) => {
            return user.author.id === message.author.id
        }

        message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
            .then(colleted => {
                const name = colleted.first().content
                const regex = !/[^a-zA-Z0-9 ]+/g.test(name)

                if (!regex) return message.channel.send('Your business name can only contain numbers and letters.')

                profiles.set(`profiles_${message.author.id}.name`, name)
                profiles.set(`profiles_${message.author.id}.money`, 0)
                profiles.set(`profiles_${message.author.id}.bought.ShopEveryone`, 1)

                return message.channel.send(`Your profile has been created with the name, **${name}**`)
        })
        .catch(() => {
            return message.channel.send('You have run out of time to create a business name!')
            }
        )
    }
}