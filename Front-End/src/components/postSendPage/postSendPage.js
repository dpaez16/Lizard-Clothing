import React, {Component} from 'react';
import {Header} from 'semantic-ui-react';
import './postSendPage.css';

export class PostSendPage extends Component {
    constructor(props) {
        super(props);
        console.log();
    }

    render() {
        return (
            <div>
                <Header size='huge'>Success</Header>
                <p>
                    Request has gone through.
                </p>
            </div>
        );
    }
}