import React, { Component } from 'react';
import PlayersTable from './components/PlayersTable';
import axios from 'axios';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: []  
        }
    }

    getPlayers(url) {
        axios.get(url)
            .then(resp => {
                const players = resp.data.players;
                this.setState({ players });
            });
    }

    componentDidMount() {
        this.getPlayers('http://localhost:8080/1_player_db.json')
    }

    render() {
        return (
            <section className="section">
                <div className="container is-fluid">
                    <PlayersTable players={this.state.players} />
                </div>
            </section>
        );
    }
}

export default App;
