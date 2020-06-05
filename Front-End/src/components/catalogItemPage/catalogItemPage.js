import React, {Component} from 'react';
import {Header, Image} from 'semantic-ui-react';
import history from './../../history';
import './catalogItemPage.css';

export class CatalogItemPage extends Component {
    constructor(props) {
        super(props);
        const {itemNum} = this.props.match.params;
        this.state = {
            itemNum: itemNum
        };
    }

    render() {
        return (
            <div>
                <Header size='large'>{this.state.itemNum}</Header>
            </div>
        );
    }
}