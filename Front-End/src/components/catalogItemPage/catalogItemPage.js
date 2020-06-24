import React, {Component} from 'react';
import {Form, Button, Header, Image} from 'semantic-ui-react';
import history from './../../history';
import {validEmail, validPhoneNum} from './../misc/helpers';
import {PROXY_URL} from '../misc/proxyURL';
import './catalogItemPage.css';


export class CatalogItemPage extends Component {
    constructor(props) {
        super(props);
        
        const {itemNum} = this.props.match.params;
        const catalogItem = this.props.catalog[itemNum];

        const {sizeOptions, colorOptions} = this.props.location.state;
        
        this.state = {
            itemType: this.props.itemType,
            itemName: catalogItem.name,
            image: catalogItem.image,
            size: undefined,
            color: undefined,
            name: undefined,
            email: undefined,
            phoneNum: undefined,
            sizeOptions: sizeOptions,
            colorOptions: colorOptions
        };
    }

    formNotFilledProperly() {
        const {name, size, color, email, phoneNum} = this.state;
        return !(
            name && 
            validEmail(email) && 
            size && 
            color && 
            validPhoneNum(phoneNum)
        );
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
            color: this.state.color
        };
        const order = {
            name: this.state.name,
            email: this.state.email,
            phoneNum: this.state.phoneNum,
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
                <Header size='huge'>
                    {this.state.itemType}
                </Header>
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
                                className='catalog-item-page__form__text'
                                required={true}
                                label='Name'
                                onChange={e => {
                                    this.setState({name: e.target.value});
                                }}
                            />
                            <Form.Input
                                className='catalog-item-page__form__text'
                                required={true}
                                label='Email'
                                onChange={e => {
                                    this.setState({email: e.target.value});
                                }}
                            />
                            <Form.Input
                                className='catalog-item-page__form__text'
                                required={true}
                                label='Phone Number'
                                onChange={e => {
                                    this.setState({phoneNum: e.target.value});
                                }}
                            />
                            <Form.Select
                                className='catalog-item-page__form__dropdown'
                                required={true}
                                label='Size'
                                options={this.state.sizeOptions}
                                placeholder='Size'
                                onChange={(_, data) => {
                                    this.setState({size: data.value});
                                }}
                            />
                            <Form.Select
                                className='catalog-item-page__form__dropdown'
                                required={true}
                                label='Color'
                                options={this.state.colorOptions}
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
