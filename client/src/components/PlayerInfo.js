import React from 'react';
import PlayersTable from './PlayersTable';
import { NO_CTRL_COLUMNS } from '../constants/Columns';
import { includePlayersWithIdsIn } from '../utils/PlayerFilters';

const isPlayerEmpty = (player) => {
    return (player == undefined || (Object.keys(player).length === 0 && player.constructor === Object));
}

const PlayerInfo = (props) => {
    let searchedPlayers = includePlayersWithIdsIn([props.playerId], props.data.players);
    const player = searchedPlayers[0];

    if (isPlayerEmpty(player)) {
        return <div></div>;
    } else {
        return (
            <div className="columns">
                <div className="column is-two-thirds is-info">
                    <PlayersTable
                        label={player.name}
                        players={searchedPlayers}
                        onPlayerDraft={props.onPlayerDraft}
                        onPlayerRemoval={props.onPlayerRemoval}
                        columns={NO_CTRL_COLUMNS}
                        maxes={props.max}
                        mins={props.min} />
                </div>
            </div>
        );
    }
}

export default PlayerInfo;