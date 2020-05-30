import React, {Component} from 'react';
import { Form, Input, TextArea, Button, Header } from 'semantic-ui-react';
import history from './../../history';
import './specialOrders.css';

export class SpecialOrders extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            message: ""
        }
    }

    invalidEmail() {
        const validEmailRegex = RegExp(
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        );
        return !validEmailRegex.test(this.state.email);
    }

    invalidForm() {
        return this.state.name.length === 0 || this.state.message.length === 0 || this.invalidEmail();
    }

    render() {
        return (
            <div>
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
                                onClick={() => {
                                    console.log("sending custom order");
                                }}
                    />
                </Form>
            </div>
        );
    }
}