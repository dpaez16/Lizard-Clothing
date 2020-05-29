import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {NavBar} from './components/navbar/navbar';
import {HomePage} from './components/home/homePage';
import './App.css';


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <NavBar />
                    <div className='main-content'>
                        <Switch>
                            <Route path='/' component={HomePage} />
                        </Switch>
                    </div>
                </React.Fragment>
            </BrowserRouter>
        );
    }
};
