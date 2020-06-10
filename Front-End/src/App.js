import React, {Component} from 'react';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import {SpecialOrders} from './components/specialOrders/specialOrders';
import {NavBar} from './components/navbar/navbar';
import {HomePage} from './components/home/homePage';
import {Catalog} from './components/catalog/catalog';
import {CatalogItemPage} from './components/catalogItemPage/catalogItemPage';
import {PostSendPage} from './components/postSendPage/postSendPage';
import history from './history';
import './App.css';


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

const hoodies = [
    {
        image: 'gallery/hoodie.jpg',
        name: 'Hoodie'
    },
    {
        image: 'gallery/hoodie.jpg',
        name: 'Hoodie 2'
    }
];

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            tshirts: tshirts,
            hoodies: hoodies
        };
    }

    render() {
        return (
            <Router history={history}>
                <React.Fragment>
                    <NavBar />
                    <div className='main-content'>
                        <Switch>
                            <Route 
                                exact
                                path='/' 
                                component={HomePage} 
                            />
                            <Route 
                                exact
                                path='/specialOrders' 
                                component={SpecialOrders} 
                            />
                            <Route 
                                exact
                                path='/tshirts' 
                                render={(props) => 
                                    <Catalog    
                                        catalogName='T-Shirts'
                                        catalogList={this.state.tshirts}
                                        catalogURL='tshirts'
                                        { ...props }
                                    />
                                }
                            />
                            <Route 
                                exact
                                path='/tshirts/:itemNum'
                                render={(props) => 
                                    <CatalogItemPage
                                        catalog={this.state.tshirts}
                                        itemType="T-Shirts"
                                        { ...props }
                                    />
                                }
                            />
                            <Route 
                                exact
                                path='/hoodies' 
                                render={(props) => 
                                    <Catalog    
                                        catalogName='Hoodies'
                                        catalogList={this.state.hoodies}
                                        catalogURL='hoodies'
                                        { ...props }
                                    />
                                }
                            />
                            <Route 
                                exact
                                path='/hoodies/:itemNum'
                                render={(props) => 
                                    <CatalogItemPage
                                        catalog={this.state.hoodies}
                                        itemType="Hoodies"
                                        { ...props }
                                    />
                                }
                            />
                            <Route 
                                exact
                                path='/sentRequest'
                                render={(props) =>
                                    <PostSendPage { ... props }/>
                                }
                            />
                        </Switch>
                    </div>
                </React.Fragment>
            </Router>
        );
    }
};
