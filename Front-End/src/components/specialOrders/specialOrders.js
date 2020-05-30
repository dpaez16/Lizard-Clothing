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

    validEmail() {
        //const regex = RegExp('(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])');
        return false;
    }

    render() {
        return (
            <div>
                <Header size='huge'>Special Orders</Header>
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
                                error={{
                                    content: 'Please enter a valid email address!',
                                    pointing: 'below'
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
                                disabled={this.validEmail()}
                                onClick={() => {
                                    // do stuff
                                }}
                    />
                </Form>
            </div>
        );
    }
}