import React, {Component} from 'react';
import {Header, Image} from 'semantic-ui-react';
import {CatalogItem} from './../catalogItem/catalogItem';
import './catalog.css';

const childrenSizeOptions = [
    {key: 's', text: 'Small', value: 'Small'},
    {key: 'm', text: 'Medium', value: 'Medium'},
    {key: 'l', text: 'Large', value: 'Large'},
    {key: 'xl', text: 'Extra Large', value: 'Extra Large'}
];


const adultSizeOptions = [
    {key: 'xs', text: 'Extra Small', value: 'Extra Small'},
    {key: 's', text: 'Small', value: 'Small'},
    {key: 'm', text: 'Medium', value: 'Medium'},
    {key: 'l', text: 'Large', value: 'Large'},
    {key: 'xl', text: 'Extra Large', value: 'Extra Large'},
    {key: '2xl', text: '2XL', value: '2XL'},
    {key: '3xl', text: '3XL', value: '3XL'}
];


const colorOptions = [
    {key: 'b', text: 'Black', value: 'Black'},
    {key: 'w', text: 'White', value: 'White'},
    {key: 'gy', text: 'Gray', value: 'Gray'},
    {key: 'cg', text: 'Charcoal Gray', value: 'Charcoal Gray'},
    {key: 'r', text: 'Red', value: 'Red'},
    {key: 'rb', text: 'Royal Blue', value: 'Royal Blue'},
    {key: 'tq', text: 'Turquoise', value: 'Turquoise'},
    {key: 'nb', text: 'Navy Blue', value: 'Navy Blue'},
    {key: 'g', text: 'Green', value: 'Green'},
    {key: 'og', text: 'Olive Green', value: 'Olive Green'},
    {key: 'y', text: 'Yellow', value: 'Yellow'},
    {key: 'pk', text: 'Pink', value: 'Pink'},
    {key: 'm', text: 'Maroon', value: 'Maroon'},
    {key: 'p', text: 'Purple', value: 'Purple'},
    {key: 't', text: 'Teal', value: 'Teal'}
];

export class Catalog extends Component {
    pickSizes(catalogName) {
        if (catalogName.toLowerCase().includes("adult")) {
            return adultSizeOptions;
        } else {
            return childrenSizeOptions;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            catalogName: this.props.catalogName,
            catalogList: this.props.catalogList,
            catalogURL: this.props.catalogURL,
            colorOptions: colorOptions,
            sizeOptions: this.pickSizes(this.props.catalogName)           
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.catalogName !== this.props.catalogName) {
            this.setState(this.props);
            this.setState({
                sizeOptions: this.pickSizes(this.props.catalogName)
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
                                    colorOptions={colorOptions}
                                />
                            );
                    })}
                </div>
            </div>
        );
    }
}