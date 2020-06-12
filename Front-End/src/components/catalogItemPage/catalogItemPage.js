import React, {Component} from 'react';
import {Form, Button, Header, Image} from 'semantic-ui-react';
import history from './../../history';
import {PROXY_URL} from '../misc/proxyURL';
import './catalogItemPage.css';

const sizeOptions = [
    {key: 's', text: 'Small', value: 'Small'},
    {key: 'm', text: 'Medium', value: 'Medium'},
    {key: 'l', text: 'Large', value: 'Large'}
];

const genderOptions = [
    {key: 'm', text: 'Male', value: 'Male'},
    {key: 'f', text: 'Female', value: 'Female'}
];

const colorOptions = [
    {key: 'b', text: 'Blue', value: 'Blue'},
    {key: 'g', text: 'Green', value: 'Green'},
    {key: 'y', text: 'Yellow', value: 'Yellow'}
];

export class CatalogItemPage extends Component {
    constructor(props) {
        super(props);
        
        const {itemNum} = this.props.match.params;
        const catalogItem = this.props.catalog[itemNum];
        
        this.state = {
            itemType: this.props.itemType,
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

    parseBody(rawBody) {
        if (rawBody.length == 0) {
            return "Order has been created!"
        }
        
        const newBody = JSON.parse(rawBody);
        let msg = newBody.errors[0].message;
        if (msg.slice(-1) !== '.') {
            msg = msg + '.';
        }

        return msg;
    }

    async requestCatalogItem() {
        if (this.formNotFilledProperly())
            return;

        const orderDetails = {
            productType: this.state.itemType,
            productName: this.state.itemName,
            size: this.state.size,
            gender: this.state.gender,
            color: this.state.color
        };
        const order = {
            name: this.state.name,
            email: this.state.email,
            specialOrder: false,
            orderDetails: orderDetails
        };

        const response = await fetch(PROXY_URL + '/sendOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        const responseData = await response.json();
        console.log(responseData);
        const msg = this.parseBody(responseData.Body);

        history.push({
            pathname: '/sentRequest',
            state: {
                requestStatus: responseData.StatusCode,
                msg: msg
            }
        });
    }

    render() {
        return (
            <div className='catalog-item-page'>
                <div className='catalog-item-page__container'>
                    <div className='catalog-item-page__metadata'>
                        <Image src={`../../${this.state.image}`}/>
                        <p className='item-metadata__name'>
                            <b>{this.state.itemName}</b>
                        </p>
                        <Header size='large'>
                            <u>Description</u>
                        </Header>
                        <p>
                            (Item Description)
                        </p>
                    </div>
                    <div className='catalog-item-page__form'>
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
