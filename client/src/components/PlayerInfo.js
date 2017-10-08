import React from 'react';
import PlayersTable from './PlayersTable';
import { NO_CTRL_COLUMNS } from '../constants/Columns';

const PlayerInfo = (props) => {
    const player = props.player;

    return (
        <div className="columns">
            <div className="column is-two-thirds is-info">
                <PlayersTable
                    label={player.name}
                    players={[player]}
                    onPlayerDraft={props.onPlayerDraft}
                    onPlayerRemoval={props.onPlayerRemoval}
                    columns={NO_CTRL_COLUMNS}
                    maxes={props.max}
                    mins={props.min} />
            </div>
        </div>
    );
}

export default PlayerInfo;