import React from 'react';
import PlayersTable from './PlayersTable';

const PlayerInfo = ({ player, onPlayerDraft, onPlayerRemoval, maxVal, minVal }) => {
    const columns = [
            { key: 'rank',  label: 'RNK' },
            { key: 'name',  label: 'NAME' },
            { key: 'pos',   label: 'POS' },
            { key: 'team',  label: 'TEAM' },
            { key: 'gp',    label: 'GP' },
            { key: 'mpg',   label: 'MPG' },
            { key: 'pts',   label: 'PTS' },
            { key: 'reb',   label: 'REB' },
            { key: 'ast',   label: 'AST' },
            { key: 'm3s',   label: '3PM' },
            { key: 'stl',   label: 'STL' },
            { key: 'blk',   label: 'BLK' },
            { key: 'fg',    label: 'FG' },
            { key: 'ft',    label: 'FT' },
            { key: 'to',    label: 'TO' }
        ];
    return (
        <div className="columns">
            <div className="column is-two-thirds is-info">
                <PlayersTable
                    label={player.name}
                    players={[player]}
                    removedPlayers={[]}
                    columns={columns}
                    maxVal={maxVal}
                    minVal={minVal} />
            </div>
        </div>
    );
}

export default PlayerInfo;