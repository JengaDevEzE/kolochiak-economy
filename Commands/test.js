module.exports = {
    name: 'test',
    description: 'Testing for the **bot owner** only.',
    aliases: ['testbot', 'tb', 't'],
    cooldown: 3,
    execute(message) {
        
        if (!message.author.id === '697864119302225952') return
        
        if (message.author.id === '697864119302225952') {
            message.channel.send('Test complete! \n\n **Here is a rundown of the stats:** \n\n __Events :tada:__ \n > message.js \n > ready.js \n\n __Commands :mega:__ \n > newprofile.js \n > resetprofile.js \n > test.js \n\n *Dev Notes:* \n `Profile setup has been completed` \n `Need to start on eco tomorrow`')
        } else return
    }
}