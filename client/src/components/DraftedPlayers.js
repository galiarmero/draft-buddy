import React from 'react';
import PlayersTable from './PlayersTable';
import { includePlayersWithIdsIn } from '../utils/PlayerFilters';
import { BASIC_COLUMNS, NINE_CAT_KEYS } from '../constants/Columns';

const getAverage = (players, prop) => {
    let sum = players.reduce( (sum, player) => {
        sum += parseFloat(player[prop]);
        return sum;
    }, 0);

    return sum / players.length;
}

const getAverages = (players) => {
    let averages = {
        name: 'Averages',
        pos: '-'
    };

    return NINE_CAT_KEYS.reduce( (averages, category) => {
        averages[category] = getAverage(players, category);
        return averages;
    }, averages);
}

const DraftedPlayers = (props) => {
    const players = includePlayersWithIdsIn(props.draftedPlayerIds, props.data.players);

    if (players.length > 0) {
        players.push(getAverages(players));
    }

    return (
        <div className={props.className}>
            <PlayersTable
                label="Picked Players"
                players={players}
                onPlayerSelect={props.onPlayerSelect}
                columns={BASIC_COLUMNS}
                maxes={props.data.max}
                mins={props.data.min} />
        </div>
    );
}

export default DraftedPlayers;