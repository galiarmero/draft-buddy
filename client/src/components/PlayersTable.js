import React from 'react';
import { Table, Tr, Td } from 'reactable';

const percentColors = [
    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];

const getColorForPercentage = (value, min, max) => {
    let pct = ((value - min)) / (max - min)
    let i = 1;
    for (; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    let lower = percentColors[i - 1];
    let upper = percentColors[i];
    let range = upper.pct - lower.pct;
    let rangePct = (pct - lower.pct) / range;
    let pctLower = 1 - rangePct;
    let pctUpper = rangePct;
    let color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
}

const coloredTd = (column, value, max, min) => {
    return (
        <Td column={column} value={value}>
            <span style={ {'background-color': getColorForPercentage(value, min, max)} }>
                {Math.round(value * 100) / 100}
            </span>
        </Td>
    );
}

const getAverage = (players, prop) => {
    let sum = 0;
    let len = players.length;
    for (let i = 0; i < len; i++) {
        sum += parseFloat(players[i][prop]);
    }

    return sum / len;
}

const getAverages = (players) => {
    return {
        pts: getAverage(players, 'pts'),
        reb: getAverage(players, 'reb'),
        ast: getAverage(players, 'ast'),
        m3s: getAverage(players, 'm3s'),
        stl: getAverage(players, 'stl'),
        blk: getAverage(players, 'blk'),
        fg: getAverage(players, 'fg'),
        ft: getAverage(players, 'ft'),
        to: getAverage(players, 'to')
    };
}

const PlayersTable =
    ({ label, players, removedPlayers, onPlayerDraft, onPlayerRemoval, onPlayerSelect, columns, minVal, maxVal }) => {
    const defaultColumns = [
        { key: 'ctrl',  label: 'CTRL' },
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

    columns = (columns) ? columns : defaultColumns;

    const playerData = players.map((player) => {
        return (
            <Tr key={player.id} onClick={() => onPlayerSelect(player)}>
                <Td column='ctrl'>
                    <div className="field is-grouped">
                        <a onClick={() => onPlayerDraft(player)} className='button is-very-small is-info'>+</a>
                        <a onClick={() => onPlayerRemoval(player.id)} className='button is-very-small is-danger'>-</a>
                    </div>
                </Td>
                <Td column='name' value={player.name}>{player.name}</Td>
                <Td column='rank' value={+player.rank}>{player.rank}</Td>
            <Td column='pos' value={player.pos}>{player.pos}</Td>
                <Td column='team' value={player.team}>{player.team}</Td>
                <Td column='gp' value={+player.gp}>{player.gp}</Td>
                {coloredTd('pts', +player.pts, maxVal.pts, minVal.pts)}
                {coloredTd('reb', +player.reb, maxVal.reb, minVal.reb)}
                {coloredTd('reb', +player.reb, maxVal.reb, minVal.reb)}
                {coloredTd('ast', +player.ast, maxVal.ast, minVal.ast)}
                {coloredTd('m3s', +player.m3s, maxVal.m3s, minVal.m3s)}
                {coloredTd('stl', +player.stl, maxVal.stl, minVal.stl)}
                {coloredTd('blk', +player.blk, maxVal.blk, minVal.blk)}
                {coloredTd('fg', +player.fg, maxVal.fg, minVal.fg)}
                {coloredTd('ft', +player.ft, maxVal.ft, minVal.ft)}
                {coloredTd('to', +player.to, maxVal.to, minVal.to)}
            </Tr>
        );
    });

    let totals = null;

    if (columns.length == 11) {
        const averages = getAverages(players);
        totals = (
            <Tr key={99999999}>
                <Td column='name' value='-'><strong>Averages</strong></Td>
                <Td column='pos' value='-'>-</Td>
                {coloredTd('pts', averages.pts, maxVal.pts, minVal.pts)}
                {coloredTd('reb', averages.reb, maxVal.reb, minVal.reb)}
                {coloredTd('ast', averages.ast, maxVal.ast, minVal.ast)}
                {coloredTd('m3s', averages.m3s, maxVal.m3s, minVal.m3s)}
                {coloredTd('stl', averages.stl, maxVal.stl, minVal.stl)}
                {coloredTd('blk', averages.blk, maxVal.blk, minVal.blk)}
                {coloredTd('fg', averages.fg, maxVal.fg, minVal.fg)}
                {coloredTd('ft', averages.ft, maxVal.ft, minVal.ft)}
                {coloredTd('to', averages.to, maxVal.to, minVal.to)}
            </Tr>
        );
    }

    return (
        <div>
            <h1 className='title is-5'>{label}</h1>
            <Table className="table is-bordered is-striped is-narrow is-fullwidth"
                columns={columns} itemsPerPage={players.length > 15 ? 15 : false}
                sortable={columns.map(col => { return col.key })}
                filterable={players.length > 1 ? ['name', 'pos', 'team'] : false}  >
                {playerData}
                {totals}
            </Table>
        </div>
    );
}

export default PlayersTable;