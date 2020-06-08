import React, {Component} from 'react';
import {Image} from 'semantic-ui-react';
import history from './../../history';
import './catalogItem.css';

export class CatalogItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: this.props.ID,
            name: this.props.name,
            image: this.props.image,
            catalogURL: this.props.catalogURL
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.name !== this.props.name) {
            this.setState(this.props);
        }
    }

    render() {
        return (
            <div 
                className='catalog-item'
                onMouseDown={() => history.push(`/${this.state.catalogURL}/${this.state.ID}`)}
            >
                <Image  
                    className='catalog-item__image'
                    src={this.state.image}
                    id={this.state.ID}
                />
                <p className='catalog-item__text'>
                    <b>{this.state.name}</b>
                </p>
            </div>
        );
    }
}