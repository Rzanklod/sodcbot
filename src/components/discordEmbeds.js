const { EmbedBuilder } = require('discord.js');

module.exports = {
    getEmbed: function(options = {}){
        const embed = new EmbedBuilder();

        if (options.title) embed.setTitle(options.title);
        if (options.color) embed.setColor(options.color);
        if (options.description) embed.setDescription(options.description);
        if (options.thumbnail) embed.setThumbnail(options.thumbnail);
        if (options.image) embed.setImage(options.image);
        if (options.url) embed.setURL(options.url);
        if (options.author) embed.setAuthor(options.author);
        if (options.footer) embed.setFooter(options.footer);
        if (options.timestamp) embed.setTimestamp();
        if (options.fields) embed.setFields(...options.fields);
        
        return embed;
    },
    getPlayerEmbed: function(playerInfo){
        firstSeen = new Date(playerInfo.createdAt);
        nameHistory = playerInfo.nameHistory;
        previousNames = "";
        lastSeen = "";

        if(nameHistory.length){
            nameHistory.sort((a, b) => {
                const aTime = new Date(a);
                const bTime = new Date(b);
                return aTime - bTime;
            });
            recentNames = nameHistory.slice(0, 5);
            for(const name of recentNames){
                nameDate = new Date(name.lastSeen);
                previousNames += `${name.name}\n`;
                lastSeen += `<t:${Math.round(nameDate.getTime()/1000)}:f>\n`;
            }
        } else {
            previousNames = "No recent names could be found.";
        }

        return module.exports.getEmbed({
            color: 0x1198F1,
            timestamp: true,
            fields: [
                {name: 'Current name', value: `${playerInfo.name}`},
                {name: 'First seen', value: `<t:${Math.round(firstSeen.getTime()/1000)}:f>`},
                {name: 'Total playtime', value: `${playerInfo.playTime}h - ${playerInfo.playTime * 2.1}h`},
                {name: 'Name history', value: previousNames, inline: true},
                {name: 'Last seen', value: lastSeen, inline: true},
            ]
        });
    },
    getServerEmbed: function(serverInfo){
        const firstSeen = new Date(serverInfo.createdAt);
        const lastSeen = new Date(serverInfo.updatedAt);
        return module.exports.getEmbed({
            color: 0x1198F1,
            timestamp: true,
            fields: [
                {name: 'Name', value: serverInfo.name},
                {name: 'Address', value: serverInfo.address, inline: true},
                {name: 'Status', value: (serverInfo.status) ? ':green_circle:' : ':red_circle:', inline: true},
                {name: 'Ip', value: `${serverInfo.ip}:${serverInfo.port}`},
                {name: 'Pop', value: `${serverInfo.players}/${serverInfo.maxPlayers}`, inline: true},
                {name: 'Rank', value: `${serverInfo.rank}`, inline: true},
                {name: 'Country', value: serverInfo.country, inline: true},
                {name: 'First seen', value: `<t:${Math.round(firstSeen.getTime()/1000)}:f>`, inline:true},
                {name: 'Last seen', value: `<t:${Math.round(lastSeen.getTime()/1000)}:f>`, inline:true}
            ]
        });
    },
}