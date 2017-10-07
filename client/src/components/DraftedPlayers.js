import React from 'react';
import PlayersTable from './PlayersTable';
import { includePlayersWithIdsIn } from '../utils/PlayerFilters';

const DraftedPlayers = (props) => {
    const players = includePlayersWithIdsIn(props.draftedPlayerIds, props.data.players);
    const min = props.data.min;
    const max = props.data.max;
    const onPlayerSelect = props.onPlayerSelect;
    const basicColumns = [
            { key: 'name',  label: 'NAME' },
            { key: 'pos',   label: 'POS' },
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
        <PlayersTable
            label="Picked Players"
            players={players}
            onPlayerSelect={onPlayerSelect}
            columns={basicColumns}
            maxVal={max}
            minVal={min} />
    );
}

export default DraftedPlayers;