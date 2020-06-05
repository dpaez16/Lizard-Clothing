import React, {Component} from 'react';
import {Header, Image} from 'semantic-ui-react';
import history from './../../history';
import './catalogItemPage.css';

export class CatalogItemPage extends Component {
    constructor(props) {
        super(props);
        
        const {itemNum} = this.props.match.params;
        const catalogItem = this.props.catalog[itemNum];
        
        this.state = {
            name: catalogItem.name,
            image: catalogItem.image
        };
    }

    render() {
        return (
            <div>
                <Header size='huge'>{this.state.name}</Header>
            </div>
        );
    }
}