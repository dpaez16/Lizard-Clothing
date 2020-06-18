import React, {Component} from 'react';
import { Form, Input, TextArea, Button, Header } from 'semantic-ui-react';
import history from './../../history';
import {PROXY_URL} from '../misc/proxyURL';
import './specialOrders.css';

export class SpecialOrders extends Component {
    constructor() {
        super();
        this.state = {
            name: undefined,
            email: undefined,
            message: undefined
        };
    }

    invalidEmail() {
        const validEmailRegex = RegExp(
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        );
        return !validEmailRegex.test(this.state.email);
    }

    invalidPhoneNum() {
        const validPhoneNumRegex = RegExp(
            /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g
        );
        return !validPhoneNumRegex.test(this.state.phoneNum);
    }

    invalidForm() {
        return !(this.state.name && this.state.message) || this.invalidEmail() || this.invalidPhoneNum();
    }

    parseBody(rawBody) {
        if (rawBody.length == 0) {
            return "Special Order has been created!"
        }
        
        const newBody = JSON.parse(rawBody);
        let msg = newBody.errors[0].message;
        if (msg.slice(-1) !== '.') {
            msg = msg + '.';
        }

        return msg;
    }

    async sendSpecialOrder() {
        if (this.invalidForm())
            return;
        
        // TODO
        // make PROXY_URL
        // Backend will send information in email
        const order = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message,
            phoneNum: this.state.phoneNum,
            specialOrder: true
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
            <div className="special-orders-form">
                <Header size='huge'>Special Orders</Header>
                <p>
                    In the message, specify your custom order as detailed as possible.
                </p>
                <Form>
                    <Form.Field id='form-input-control-name'
                                control={Input}
                                required={true}
                                onChange={e => {
                                    this.setState({name: e.target.value});
                                }}
                                label='Name'
                    />
                    <Form.Field id='form-input-control-error-email'
                                control={Input}
                                required={true}
                                label='Email'
                                onChange={e => {
                                    this.setState({email: e.target.value});
                                }}
                    />
                    <Form.Field id='form-input-control-error-phone-number'
                                control={Input}
                                required={true}
                                label='Phone Number'
                                onChange={e => {
                                    this.setState({phoneNum: e.target.value});
                                }}
                    />
                    <Form.Field id='form-textarea-control-message'
                                control={TextArea}
                                required={true}
                                label='Message'
                                onChange={e => {
                                    this.setState({message: e.target.value});
                                }}
                    />
                    <Form.Field id='form-button-control-public'
                                control={Button}
                                content='Send'
                                disabled={this.invalidForm()}
                                onClick={async () => this.sendSpecialOrder()}
                    />
                </Form>
            </div>
        );
    }
}