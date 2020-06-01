import React, {Component} from 'react';
import {Header, Image} from 'semantic-ui-react';
import history from './../../history';
import './catalog.css';

export class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catalogName: this.props.catalogName,
            catalogList: this.props.catalogList
        };
    }

    render() {
        return (
            <div>
                <Header size='huge'>{this.state.catalogName}</Header>
                <div className='catalog-list'>
                    {this.state.catalogList.map((catalogItem, i) => {
                            return (
                                <div className='catalog-item'>
                                    <Image  className='catalog-item__image'
                                            src={catalogItem.image}
                                            id={i}
                                    />
                                    <p className='catalog-item__text'>
                                        <b>{catalogItem.name}</b>
                                    </p>
                                </div>
                            );
                    })}
                </div>
            </div>
        );
    }
}