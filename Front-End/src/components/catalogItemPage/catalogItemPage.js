import React, {Component} from 'react';
import {Form, Button, Header, Image} from 'semantic-ui-react';
import history from './../../history';
import './catalogItemPage.css';

const sizeOptions = [
    {key: 's', text: 'Small', value: 'small'},
    {key: 'm', text: 'Medium', value: 'medium'},
    {key: 'l', text: 'Large', value: 'large'}
];

const genderOptions = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'}
];

const colorOptions = [
    {key: 'b', text: 'Blue', value: 'blue'},
    {key: 'g', text: 'Green', value: 'green'},
    {key: 'y', text: 'Yellow', value: 'yellow'}
];

export class CatalogItemPage extends Component {
    constructor(props) {
        super(props);
        
        const {itemNum} = this.props.match.params;
        const catalogItem = this.props.catalog[itemNum];
        
        this.state = {
            name: catalogItem.name,
            image: catalogItem.image,
            size: undefined,
            color: undefined,
            gender: undefined
        };
    }

    formNotFilled() {
        const {size, color, gender} = this.state;
        return !(size && color && gender);
    }

    render() {
        return (
            <div className='catalog-item-page'>
                <Header size='huge'>{this.state.name}</Header>
                <div className='catalog-item-page__container'>
                    <Image src={`../../${this.state.image}`}/>
                    <div>
                        <Form>
                            <Form.Select
                                selection
                                required={true}
                                label='Size'
                                options={sizeOptions}
                                placeholder='Size'
                                onChange={(_, data) => {
                                    this.setState({size: data.value});
                                }}
                            />
                            <Form.Select
                                required={true}
                                label='Gender'
                                options={genderOptions}
                                placeholder='Gender'
                                onChange={(_, data) => {
                                    this.setState({gender: data.value});
                                }}
                            />
                            <Form.Select
                                required={true}
                                label='Color'
                                options={colorOptions}
                                placeholder='Color'
                                onChange={(_, data) => {
                                    this.setState({color: data.value});
                                }}
                            />
                            <Button disabled={this.formNotFilled()}>
                                Request Item
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}