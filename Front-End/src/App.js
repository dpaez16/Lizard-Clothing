import React, {Component} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import {SpecialOrders} from './components/specialOrders/specialOrders';
import {NavBar} from './components/navbar/navbar';
import {HomePage} from './components/home/homePage';
import {Catalog} from './components/catalog/catalog';
import history from './history';
import './App.css';


export default class App extends Component {
    constructor() {
        super();
        const tshirts = [
            {
                image: 'gallery/tshirt.jpg',
                name: 'Shirt'
            },
            {
                image: 'gallery/tshirt.jpg',
                name: 'Shirt 2'
            }
        ];

        this.state = {
            tshirts: tshirts
        };
    }

    render() {
        return (
            <Router history={history}>
                <React.Fragment>
                    <NavBar />
                    <div className='main-content'>
                        <Switch>
                            <Route path='/specialOrders' component={SpecialOrders} />
                            <Route path='/tshirts' render={(props) => 
                                <Catalog    catalogName='T-Shirts'
                                            catalogList={this.state.tshirts}
                                            { ...props }
                                />
                            }/>
                            <Route path='/' component={HomePage} />
                        </Switch>
                    </div>
                </React.Fragment>
            </Router>
        );
    }
};
