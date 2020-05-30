import React, {Component} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import {SpecialOrders} from './components/specialOrders/specialOrders';
import {NavBar} from './components/navbar/navbar';
import {HomePage} from './components/home/homePage';
import history from './history';
import './App.css';


export default class App extends Component {
    render() {
        return (
            <Router history={history}>
                <React.Fragment>
                    <NavBar />
                    <div className='main-content'>
                        <Switch>
                            <Route path='/specialOrders' component={SpecialOrders} />
                            <Route path='/' component={HomePage} />
                        </Switch>
                    </div>
                </React.Fragment>
            </Router>
        );
    }
};
