import React from 'react';
import PlayersTable from './PlayersTable';
import { excludePlayersWithIdsIn } from '../utils/PlayerFilters';

const AvailablePlayers = (props) => {
    const players = excludePlayersWithIdsIn(props.removedPlayerIds, props.data.players);

    return (
        <div className={props.className}>
            <PlayersTable
                label="Stats"
                players={players}
                onPlayerDraft={props.onPlayerDraft}
                onPlayerSelect={props.onPlayerSelect}
                onPlayerRemoval={props.onPlayerRemoval}
                mins={props.data.min}
                maxes={props.data.max} />
        </div>
    );
}

export default AvailablePlayers;
