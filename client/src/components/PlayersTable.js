import React from 'react';
import { Table, Tr, Td } from 'reactable';
import DEFAULT_COLUMNS, { NINE_CAT_KEYS } from '../constants/Columns';
import generateColoredTds from '../utils/ColoredTdsGenerator';

const PlayersTable = (props) => {
    const columns = (props.columns) ? props.columns : DEFAULT_COLUMNS;
    const players = props.players;
    const maxes = props.maxes;
    const mins = props.mins;

    const playerData = players.map( player => {
        return (
            <Tr key={player.id} onClick={() => props.onPlayerSelect(player)}>
                <Td column='ctrl'>
                    <div className="field is-grouped">
                        <a onClick={() => props.onPlayerDraft(player)} className='button is-very-small is-info'>+</a>
                        <a onClick={() => props.onPlayerRemoval(player.id)} className='button is-very-small is-danger'>-</a>
                    </div>
                </Td>
                <Td column='name' value={player.name}>{player.name}</Td>
                <Td column='rank' value={+player.rank}>{player.rank}</Td>
            <Td column='pos' value={player.pos}>{player.pos}</Td>
                <Td column='team' value={player.team}>{player.team}</Td>
                <Td column='gp' value={+player.gp}>{player.gp}</Td>
                {generateColoredTds(NINE_CAT_KEYS, player, maxes, mins)}
            </Tr>
        );
    });

    return (
        <div>
            <h1 className='title is-5'>{props.label}</h1>
            <Table className="table is-bordered is-striped is-narrow is-fullwidth"
                columns={columns} itemsPerPage={players.length > 15 ? 15 : false}
                sortable={columns.map(col => { return col.key })}
                filterable={players.length > 1 ? ['name', 'pos', 'team'] : false}  >
                {playerData}
            </Table>
        </div>
    );
}

export default PlayersTable;