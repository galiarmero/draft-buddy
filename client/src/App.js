import React, { Component } from 'react';
import PlayersTable from './components/PlayersTable';
import Menu from './components/Menu';
import PlayerInfo from './components/PlayerInfo';
import axios from 'axios';
import NProgress from 'nprogress';
import './App.css';
import 'bulma/css/bulma.css'
import './customnprogress.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [],
            draftedPlayers: [],
            removedPlayers: [],
            selectedMenu: 'proj',
            selectedRankBy: 'pergame',
            url: '/proj/pergame',
            selectedPlayer: {},
            min: 0,
            max: 0
        }

        this.onPlayerDraft = this.onPlayerDraft.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.changeRankBy = this.changeRankBy.bind(this);
        this.onPlayerSelect = this.onPlayerSelect.bind(this);
        this.onPlayerRemoval = this.onPlayerRemoval.bind(this);

        this.basicColumns = [
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
    }

    getPlayers() {
        NProgress.start();
        axios.get(this.state.url)
            .then(resp => {
                const players = resp.data.players;
                const min = resp.data.min;
                const max = resp.data.max;
                this.setState({ players, min, max, selectedPlayer : players[0] });
                NProgress.done();
            })
            .catch(err => {
                NProgress.done();
            });
    }

    getRemovedPlayers() {
        axios.get('/removed_players')
            .then(resp => {
                const removedPlayers = resp.data;
                this.setState({ removedPlayers });
            });
    }

    getDraftedPlayers() {
        axios.get('/drafted_players')
            .then(resp => {
                const draftedPlayers = resp.data;
                this.setState({ draftedPlayers });
            });
    }

    componentDidMount() {
        this.getPlayers();
        this.getRemovedPlayers();
        this.getDraftedPlayers();
        // TODO: get drafted_players
    }

    updateUrl() {
        this.setState({ url: `/${this.state.selectedMenu}/${this.state.selectedRankBy}` })
    }

    onPlayerDraft(player) {
        axios.post('/drafted_players', player)
            .then(resp => {
                let draftedPlayers = this.state.draftedPlayers;
                draftedPlayers.push(player);
                this.setState({ draftedPlayers })
                this.onPlayerRemoval(player.id);
            });
    }

    selectOption(selectedMenu) {
        this.setState({ selectedMenu });
        this.updateUrl();
        this.getPlayers();
    }

    changeRankBy(event) {
        this.setState({selectedRankBy: event.target.value})
        this.updateUrl();
        this.getPlayers();
    }

    onPlayerSelect(selectedPlayer) {
        this.setState({ selectedPlayer });
    }

    onPlayerRemoval(player_id) {
        axios.post('/removed_players', {player_id})
            .then(resp => {
                let removedPlayers = this.state.removedPlayers;
                removedPlayers.push(player_id);
                this.setState({ removedPlayers });
            });
    }

    render() {
        return (
            <section className="">
                <div className="container is-fluid">
                    <Menu selectedMenu={this.state.selectedMenu}
                            selectedRankBy={this.state.selectedRankBy}
                            onSelect={this.selectOption}
                            onChangeRankBy={this.changeRankBy} />
                    <PlayerInfo player={this.state.selectedPlayer}
                        onPlayerDraft={this.onPlayerDraft}
                        onPlayerRemoval={this.onPlayerRemoval}
                        maxVal={this.state.max}
                        minVal={this.state.min} />
                    <div className="columns">
                        <div className="column is-7">
                            <PlayersTable
                                label="Stats"
                                players={this.state.players}
                                removedPlayers={this.state.removedPlayers}
                                onPlayerDraft={this.onPlayerDraft}
                                onPlayerSelect={this.onPlayerSelect}
                                onPlayerRemoval={this.onPlayerRemoval}
                                maxVal={this.state.max}
                                minVal={this.state.min} />
                        </div>
                        <div className="column is-5">
                            <PlayersTable
                                label="Picked Players"
                                players={this.state.draftedPlayers}
                                removedPlayers={[]}
                                onPlayerSelect={this.onPlayerSelect}
                                columns={this.basicColumns}
                                maxVal={this.state.max}
                                minVal={this.state.min} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default App;
