const db = require('quick.db');

module.exports = {
    name: 'buy',
    description: 'Buy an item from our shop!',
    aliases: ['b'],
    execute(message, args) {

        const profile = new db.table('profiles')
        const memberProfile = profile.get(`profiles_${message.author.id}`)

        if (!memberProfile) {
            return message.channel.send('You have no profile!')
        }

        const items = []

        items.push('ShopEveryone')
        if (memberProfile.bought.ShopEveryone > 300) items.push('huntingLicense')
        if (memberProfile.bought.ShopEveryone > 300) items.push('fishingLicense')
        if (memberProfile.bought.ShopEveryone > 500) items.push('entertainmentLicense')
        if (memberProfile.bought.ShopEveryone > 600) items.push('lawLicense')
        if (memberProfile.bought.ShopEveryone > 520) items.push('transportLicense')
        if (memberProfile.bought.ShopEveryone > 535) items.push('restrauntLicense')
        if (memberProfile.bought.ShopEveryone > 550) items.push('liquorLicense')
        if (memberProfile.bought.ShopEveryone > 25) items.push('taxiLicense')
        if (memberProfile.bought.ShopEveryone > 60) items.push('longDistanceLicense')
        if (memberProfile.bought.ShopEveryone > 100) items.push('boatLicense')
        if (memberProfile.bought.ShopEveryone > 600) items.push('hotelLicense')
        if (memberProfile.bought.ShopEveryone > 700) items.push('horseRacingLicense')
        if (memberProfile.bought.ShopEveryone > 600) items.push('boxingLicense')

        if (!items.includes(args[1]) || !args[1]) {
            return message.channel.send(`You need to buy something from the following ${items.map(i => i).join(", ")}`)
        }

        var cost = profile.get(`profiles_${message.author.id}.bought.${args[1]}`) * 20 + 20 || 20

        if (!args[2]) {
            const afterBal = profile.get(`profiles_${message.author.id}.money`) - cost
            if (afterBal > 0) {
                profile.subtract(`profiles_${message.author.id}.money`, cost)
                profile.add(`profiles_${message.author.id}.bought.${args[1]}`, 1)
                return message.channel.send(`You bought a(n) ${args[1]}`)
            } else {
                return message.channel.send('You can\'t afford this!')}

        } else if (args[2]) {
            if (args[2] == 'max') {
                var bal = profile.get(`profiles_${message.author.id}.money`)
                const cost2 = (profile.get(`profiles_${message.author.id}.bought.${args[1]}`)) * 20 + 20 || 20

                if (cost2 > bal) return message.channel.send('You can\'t afford this!')

                var oldBal = bal
                var newBal = 0
                var boughtItems = 0

                while (bal > 0) {
                    newBal = bal - cost2
                    bal = bal - cost2
                    boughtItems = boughtItems + 1
                }

                var latestPrice = profile.get(`profiles_${message.author.id}.bought.${args[1]}`) || 20
                newBal = newBal + (latestPrice * 20) + (latestPrice * 20)
                boughtItems = boughtItems - 2

                if (boughtItems == 0) return message.channel.send('You can only buy max more than 1 item!')
                profile.add(`profiles_${message.author.id}.bought.${args[1]}`, boughtItems)
                profile.set(`profiles_${message.author.id}.money`, newBal)

                return message.channel.send(`You bought ${boughtItems.toLocaleString()} ${args[1]} for ${(oldBal - newBal).toLocaleString()}`)
            } else if (args[2]) {
                const bal = profile.get(`profiles_${message.author.id}.money`)

                if (isNaN(args[2])) return message.channel.send(`This is not a valid amount of ${args[1]} to buy!`)
                if (args[2] < 1) return message.channel.send(`You must buy more than 1 ${args[1]}!`)

                const extraCost = (20 * args[2]) - 20
                const newCost = (cost * args[2]) + extraCost

                if (newCost > bal) return message.channel.send('You can\'t afford this!')

                profile.subtract(`profiles_${message.author.id}.money`, newCost)
                profile.add(`profiles_${message.author.id}.bought.${args[1]}`, args[2])
                return message.channel.send(`You bought ${args[2]} ${args[1]} for ${newCost.toLocaleString()}`)
            }
        }
    }
}