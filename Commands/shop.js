const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shop',
    description: 'The shop command for the server',
    aliases: ['store', 's'],
    cooldown: 3,
    execute(message) {

        if (message.content === '!shop') {
        const categoryShop = new MessageEmbed()
        .setTitle('The Kolochiak Union Shop Categories')
        .setDescription('Type `!shop <category>` to view that category of the shop')
        .setColor('PURPLE')
        .addFields(
            { name: '**Hunting Licenses**', value: 'For ability to hunt animals of all types legally \n `!shop hunting`' },
            { name: '**Loans**', value: 'Buy out a loan from the government \n `!shop loans`' },
            { name: '**Business License**', value: 'Buy a business license to practice your very own business \n `!shop business`' },
            { name: '**Transportation License**', value: 'Own the ability to transport goods and or people \n `!shop transportation`' },
            { name: '**Hospitality License**', value: 'The ability to use hotels or other forms of hospitality \n `!shop hospitality`' },
            { name: '**Entertainment License**', value: 'The ability to host entertainment such as horse racing or boxing. \n `!shop entertainment`' },
        )
        .setTimestamp()
        .setFooter('This is the official Kolochiak Union shop.')
    message.channel.send(categoryShop)}

            const p = new db.table('profiles')
            const member = message.member.id

            const huntingLicense = p.get(`profiles_${member}.bought.huntingLicense`)
            const fishingLicense = p.get(`profiles_${member}.bought.fishingLicense`)
            const entertainmentLicense = p.get(`profiles_${member}.bought.entertainmentLicense`)
            const lawLicense = p.get(`profiles_${member}.bought.lawLicense`)
            const transportLicense = p.get(`profiles_${member}.bought.transportLicense`)
            const restaurantLicense = p.get(`profiles_${member}.bought.restaurantLicense`)
            const liquorLicense = p.get(`profiles_${member}.bought.liquorLicense`)
            const taxiLicense = p.get(`profiles_${member}.bought.taxiLicense`)
            const longDistanceLicense = p.get(`profiles_${member}.bought.longDistanceLicense`)
            const boatLicense = p.get(`profiles_${member}.bought.boatLicense`)
            const hotelLicense = p.get(`profiles_${member}.bought.hotelLicense`)
            const horseRacingLicense = p.get(`profiles_${member}.bought.horseRacingLicense`)
            const boxingLicense = p.get(`profiles_${member}.bought.boxingLicense`)

            if (message.content === '!shop hunting') {
            return message.channel.send(new MessageEmbed()
            .setTitle('Hunting Licenses')
            .setColor('PURPLE')
            .setDescription(`
                Hunting License - ⁂${(huntingLicense * 300 + 300 || "300").toLocaleString()} **->** $150 USD
                Fishing License - ⁂${(fishingLicense * 300 + 300 || "300").toLocaleString()} **->** $150 USD`
            )
        )}

        if (message.content === '!shop loans') {
            return message.channel.send( new MessageEmbed()
            .setTitle('Loans')
            .setColor('PURPLE')
            .setDescription('In order to buy a loan, you must talk to a member of IT to confirm your loan. \n The amounts you are allowed to take out are listed below!')
            .addField('Loans', [
                '100',
                '500',
                '1000',
                '5000',
            ])
        )}

        if (message.content === '!shop business') {
            return message.channel.send(new MessageEmbed()
            .setTitle('Business Licenses')
            .setColor('PURPLE')
            .setDescription(`
            Entertainment License - ⁂${(entertainmentLicense * 500 + 500 || "500").toLocaleString()} **->** $250 USD
            Law License - ⁂${(lawLicense * 600 + 600 || "600").toLocaleString()} **->** $300 USD
            Transport License - ⁂${(transportLicense * 520 + 520 || "520").toLocaleString()} **->** $260 USD
            Restaurant License - ⁂${(restaurantLicense * 535 + 535 || "535").toLocaleString()} **->** $267.50 USD
            Liquor License - ⁂${(liquorLicense * 550 + 550 || "550").toLocaleString()} **->** $275 USD`)
        )}

        if (message.content === '!shop transport') {
            return message.channel.send(new MessageEmbed()
            .setTitle('Transportation Licenses')
            .setColor('PURPLE')
            .setDescription(`
            Taxi License - ⁂${(taxiLicense * 25 + 25 || "25").toLocaleString()} **->** $12.50 USD
            Long Distance License - ⁂${(longDistanceLicense * 60 + 60 || "60").toLocaleString()} **->** $30 USD
            Boat License - ⁂${(boatLicense * 100 + 100 || "100").toLocaleString()} **->** $50 USD`)
        )}

        if (message.content === '!shop hospitality') {
            return message.channel.send(new MessageEmbed()
            .setTitle('Hospitality Licenses')
            .setColor('PURPLE')
            .setDescription(`
            Hotel License - ⁂${(hotelLicense * 600 + 600 || "600").toLocaleString()} **->** $300 USD`)
        )}

        if (message.content === '!shop entertainment') {
            return message.channel.send(new MessageEmbed()
            .setTitle('Entertainment Licenses')
            .setColor('PURPLE')
            .setDescription(`
            Horse Racing License - ⁂${(horseRacingLicense * 700 + 700 || "700").toLocaleString()} **->** $350 USD
            Boxing License - ⁂${(boxingLicense * 600 + 600 || "600").toLocaleString()} **->** $300 USD`)
        )}
    }
}