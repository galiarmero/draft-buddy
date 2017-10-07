const includePlayersWithIdsIn = (includedIds, players) => {
    return players.filter( player => {
        return (includedIds.indexOf(player.id) >= 0);
    });
}

const excludePlayersWithIdsIn = (excludedIds, players) => {
    return players.filter( player => {
        return (excludedIds.indexOf(player.id) < 0);
    });
}

export { includePlayersWithIdsIn, excludePlayersWithIdsIn };