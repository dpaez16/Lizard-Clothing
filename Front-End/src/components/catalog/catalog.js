import React, {Component} from 'react';
import {Header, Image} from 'semantic-ui-react';
import {CatalogItem} from './../catalogItem/catalogItem';
import './catalog.css';

export class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catalogName: this.props.catalogName,
            catalogList: this.props.catalogList,
            catalogURL: this.props.catalogURL
        };
    }

    render() {
        return (
            <div>
                <Header size='huge'>{this.state.catalogName}</Header>
                <div className='catalog-list'>
                    {this.state.catalogList.map((catalogItem, i) => {
                            return (
                                <CatalogItem    ID={i}
                                                image={catalogItem.image}
                                                name={catalogItem.name}
                                                catalogURL={this.state.catalogURL}
                                />
                            );
                    })}
                </div>
            </div>
        );
    }
}