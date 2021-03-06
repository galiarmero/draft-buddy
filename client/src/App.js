import React, { Component } from 'react';
import Menu from './components/Menu';
import PlayerInfo from './components/PlayerInfo';
import AvailablePlayers from './components/AvailablePlayers';
import DraftedPlayers from './components/DraftedPlayers';
import axios from 'axios';
import NProgress from 'nprogress';
import './App.css';
import 'bulma/css/bulma.css'
import './customnprogress.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                players: [],
                min: [],
                max: []                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
            },
            draftedPlayerIds: [],
            removedPlayerIds: [],
            selectedMenu: 'proj',
            selectedRankBy: 'pergame',
            selectedPlayerId: 0
        }

        this.onPlayerDraft = this.onPlayerDraft.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.onChangeRankBy = this.onChangeRankBy.bind(this);
        this.onPlayerSelect = this.onPlayerSelect.bind(this);
        this.onPlayerRemoval = this.onPlayerRemoval.bind(this);
    }

    getPlayerData() {
        NProgress.start();
        let url = `/${this.state.selectedMenu}/${this.state.selectedRankBy}`;
        axios.get(url)
            .then(resp => {
                const data = resp.data;
                this.setState({ data });
                NProgress.done();
            })
            .catch(err => {
                NProgress.done();
            });
    }

    getRemovedPlayerIds() {
        axios.get('/removed_players')
            .then(resp => {
                const removedPlayerIds = resp.data;
                this.setState({ removedPlayerIds });
            });
    }

    getDraftedPlayerIds() {
        axios.get('/drafted_players')
            .then(resp => {
                const draftedPlayerIds = resp.data;
                this.setState({ draftedPlayerIds });
            });
    }

    componentDidMount() {
        this.getPlayerData();
        this.getRemovedPlayerIds();
        this.getDraftedPlayerIds();
    }

    onPlayerDraft(player_id) {
        axios.post('/drafted_players', {player_id})
            .then(resp => {
                let draftedPlayerIds = this.state.draftedPlayerIds;
                draftedPlayerIds.push(player_id);
                this.setState({ draftedPlayerIds })
                this.onPlayerRemoval(player_id);
            });
    }

    selectOption(selectedMenu) {
        this.setState({ selectedMenu }, () => {
            this.getPlayerData();
        });
    }

    onChangeRankBy(event) {
        this.setState({selectedRankBy: event.target.value}, () => {
            this.getPlayerData();
        });
    }

    onPlayerSelect(selectedPlayerId) {
        this.setState({ selectedPlayerId });
    }

    onPlayerRemoval(player_id) {
        axios.post('/removed_players', {player_id})
            .then(resp => {
                let removedPlayerIds = this.state.removedPlayerIds;
                removedPlayerIds.push(player_id);
                this.setState({ removedPlayerIds });
            });
    }

    render() {
        return (
            <section className="">
                <div className="container is-fluid">
                    <Menu selectedMenu={this.state.selectedMenu}
                            selectedRankBy={this.state.selectedRankBy}
                            onSelect={this.selectOption}
                            onChangeRankBy={this.onChangeRankBy} />
                    <PlayerInfo
                        data={this.state.data}
                        playerId={this.state.selectedPlayerId}
                        min={this.state.data.min}
                        max={this.state.data.max}
                        onPlayerDraft={this.onPlayerDraft}
                        onPlayerRemoval={this.onPlayerRemoval} />
                    <div className="columns">
                        <AvailablePlayers
                            data={this.state.data}
                            removedPlayerIds={this.state.removedPlayerIds}
                            onPlayerDraft={this.onPlayerDraft}
                            onPlayerSelect={this.onPlayerSelect}
                            onPlayerRemoval={this.onPlayerRemoval}
                            className={"column is-7"} />
                        <DraftedPlayers
                            data={this.state.data}
                            draftedPlayerIds={this.state.draftedPlayerIds}
                            onPlayerSelect={this.onPlayerSelect}
                            className={"column is-5"} />
                    </div>
                </div>
            </section>
        );
    }
}

export default App;
