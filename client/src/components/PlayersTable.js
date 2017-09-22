import React, { Component } from 'react';
import { Table, Tr, Td } from 'reactable';

class PlayersTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table className="table is-bordered is-striped is-narrow is-fullwidth"
                data={this.props.players} />
        );
    }
}

export default PlayersTable;