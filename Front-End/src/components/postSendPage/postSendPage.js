import React, {Component} from 'react';
import {Header} from 'semantic-ui-react';
import './postSendPage.css';

export class PostSendPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestStatus: 'Error 404',
            msg: 'Undefined.'
        }

        if (props.location.state) {
            this.state.requestStatus = props.location.state.requestStatus;
            this.state.msg = props.location.state.msg;
        }
    }

    render() {
        return (
            <div>
                <Header size='huge'>{this.state.requestStatus}</Header>
                <p>
                    {this.state.msg}
                </p>
            </div>
        );
    }
}