import React, {Component} from 'react';
import {Header, Image} from 'semantic-ui-react';
import {CatalogItem} from './../catalogItem/catalogItem';
import {options} from './../misc/options';
import './catalog.css';


export class Catalog extends Component {
    pickSizes(catalogName) {
        if (catalogName.toLowerCase().includes("adult")) {
            return options.adultSizeOptions;
        } else {
            return options.childrenSizeOptions;
        }
    }

    getItemType(catalogName) {
        if (catalogName.toLowerCase().includes("adult")) {
            return "Adult";
        } else {
            return "Child";
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            catalogName: this.props.catalogName,
            catalogList: this.props.catalogList,
            catalogURL: this.props.catalogURL,
            colorOptions: options.colorOptions,
            sizeOptions: this.pickSizes(this.props.catalogName),
            itemType: this.getItemType(this.props.catalogName)
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.catalogName !== this.props.catalogName) {
            this.setState(this.props);
            this.setState({
                sizeOptions: this.pickSizes(this.props.catalogName),
                itemType: this.getItemType(this.props.catalogName)
            });
        }
    }

    render() {
        return (
            <div>
                <Header size='huge'>{this.state.catalogName}</Header>
                <div className='catalog-list'>
                    {this.state.catalogList.map((catalogItem, i) => {
                            return (
                                <CatalogItem    
                                    ID={i}
                                    key={i}
                                    image={catalogItem.image}
                                    name={catalogItem.name}
                                    catalogURL={this.state.catalogURL}
                                    sizeOptions={this.state.sizeOptions}
                                    colorOptions={options.colorOptions}
                                />
                            );
                    })}
                </div>
            </div>
        );
    }
}