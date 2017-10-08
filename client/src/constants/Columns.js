const DEFAULT_COLUMNS = [
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

const NON_BASIC_COL_KEYS = ['ctrl', 'rnk', 'team', 'gp', 'mpg'];
const BASIC_COLUMNS = DEFAULT_COLUMNS.filter( column => {
    return (NON_BASIC_COL_KEYS.indexOf(column.key) < 0);
});

const NO_CTRL_COLUMNS = DEFAULT_COLUMNS.filter( column => {
    return (column.key !== 'ctrl');
});

const NINE_CAT_KEYS = ['pts', 'reb', 'ast', 'm3s', 'stl', 'blk', 'fg', 'ft', 'to'];

export default DEFAULT_COLUMNS;
export { DEFAULT_COLUMNS, BASIC_COLUMNS, NO_CTRL_COLUMNS, NINE_CAT_KEYS };