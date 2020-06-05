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
            itemName: catalogItem.name,
            image: catalogItem.image,
            size: undefined,
            color: undefined,
            gender: undefined,
            name: undefined,
            email: undefined
        };
    }

    validEmail() {
        const validEmailRegex = RegExp(
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        );
        return validEmailRegex.test(this.state.email);
    }

    formNotFilledProperly() {
        const {name, size, color, gender} = this.state;
        return !(name && this.validEmail() && size && color && gender);
    }

    requestCatalogItem() {
        if (this.formNotFilledProperly())
            return;

        // TODO
        const {name, email, size, gender, color} = this.state;
        console.log(name);
        console.log(email);
        console.log(size);
        console.log(gender);
        console.log(color);
    }

    render() {
        return (
            <div className='catalog-item-page'>
                <Header size='huge'>{this.state.itemName}</Header>
                <div className='catalog-item-page__container'>
                    <Image src={`../../${this.state.image}`}/>
                    <div>
                        <Form>
                            <Form.Input
                                required={true}
                                label='Name'
                                onChange={e => {
                                    this.setState({name: e.target.value});
                                }}
                            />
                            <Form.Input
                                required={true}
                                label='Email'
                                onChange={e => {
                                    this.setState({email: e.target.value});
                                }}
                            />
                            <Form.Select
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
                            <Button 
                                disabled={this.formNotFilledProperly()}
                                onClick={async () => this.requestCatalogItem()}
                            >
                                Request Item
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}