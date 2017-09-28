import React, { Component } from 'react';
const config = require('../../config.js');
import Plug from './Plug.jsx';
const styles = {
    display: 'flex',
    flexDirection: 'row'
};

export default class Stage extends Component {
    render() {
        return (
            <div style={styles}>
                {config.relays.map(relay => {
                    if (relay.name) return <Plug name={relay.name} pin={relay.pin} />;
                })}
            </div>
        );
    }
}
