const includePlayersWithIdsIn = (includedIds, players) => {
    let numPlayers = players.length;

    if (!numPlayers) {
        return [];
    }

    return includedIds.map( includedPlayerId => {
        for (let i = 0; i < numPlayers; i++) {
            if (players[i].id == includedPlayerId) {
                return players[i];
            }
        }
        return {};
    });
}

const excludePlayersWithIdsIn = (excludedIds, players) => {
    return players.filter( player => {
        return (excludedIds.indexOf(player.id) < 0);
    });
}

export { includePlayersWithIdsIn, excludePlayersWithIdsIn };