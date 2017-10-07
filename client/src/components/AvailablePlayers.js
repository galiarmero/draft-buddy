import React from 'react';
import PlayersTable from './PlayersTable';
import { excludePlayersWithIdsIn } from '../utils/PlayerFilters';

const AvailablePlayers = (props) => {
    const players = excludePlayersWithIdsIn(props.removedPlayerIds, props.data.players);
    const min = props.data.min;
    const max = props.data.max;
    const onPlayerDraft = props.onPlayerDraft;
    const onPlayerSelect = props.onPlayerSelect;
    const onPlayerRemoval = props.onPlayerRemoval;

    return (
        <div>
            <PlayersTable
                label="Stats"
                players={players}
                onPlayerDraft={onPlayerDraft}
                onPlayerSelect={onPlayerSelect}
                onPlayerRemoval={onPlayerRemoval}
                minVal={min}
                maxVal={max} />
        </div>
    );
}

export default AvailablePlayers;
