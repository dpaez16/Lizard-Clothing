import React, {Component} from 'react';
import {Header} from 'semantic-ui-react';
import history from './../../history';
import './catalog.css';

export class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <Header size='huge'>T-Shirts</Header>
            </div>
        );
    }
}