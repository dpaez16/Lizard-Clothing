import React, {Component} from 'react';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import {SpecialOrders} from './components/specialOrders/specialOrders';
import {NavBar} from './components/navbar/navbar';
import {HomePage} from './components/home/homePage';
import {Catalog} from './components/catalog/catalog';
import {CatalogItemPage} from './components/catalogItemPage/catalogItemPage';
import {PostSendPage} from './components/postSendPage/postSendPage';
import {products} from './components/misc/products';
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
                                path='/tshirts/adult' 
                                render={(props) => 
                                    <Catalog    
                                        catalogName='T-Shirts (Adult)'
                                        catalogList={products.tshirts}
                                        catalogURL='tshirts/adult'
                                        { ...props }
                                    />
                                }
                            />
                            <Route 
                                exact
                                path='/tshirts/adult/:itemNum'
                                render={(props) => 
                                    <CatalogItemPage
                                        catalog={products.tshirts}
                                        itemType="T-Shirts (Adult)"
                                        { ...props }
                                    />
                                }
                            />
                            <Route 
                                exact
                                path='/tshirts/child' 
                                render={(props) => 
                                    <Catalog    
                                        catalogName='T-Shirts (Child)'
                                        catalogList={products.tshirts}
                                        catalogURL='tshirts/child'
                                        { ...props }
                                    />
                                }
                            />
                            <Route 
                                exact
                                path='/tshirts/child/:itemNum'
                                render={(props) => 
                                    <CatalogItemPage
                                        catalog={products.tshirts}
                                        itemType="T-Shirts (Child)"
                                        { ...props }
                                    />
                                }
                            />
                            <Route 
                                exact
                                path='/hoodies/adult' 
                                render={(props) => 
                                    <Catalog    
                                        catalogName='Hoodies (Adult)'
                                        catalogList={products.hoodies}
                                        catalogURL='hoodies/adult'
                                        { ...props }
                                    />
                                }
                            />
                            <Route 
                                exact
                                path='/hoodies/adult/:itemNum'
                                render={(props) => 
                                    <CatalogItemPage
                                        catalog={products.hoodies}
                                        itemType="Hoodies (Adult)"
                                        { ...props }
                                    />
                                }
                            />
                            <Route 
                                exact
                                path='/hoodies/child' 
                                render={(props) => 
                                    <Catalog    
                                        catalogName='Hoodies (Child)'
                                        catalogList={products.hoodies}
                                        catalogURL='hoodies/child'
                                        { ...props }
                                    />
                                }
                            />
                            <Route 
                                exact
                                path='/hoodies/child/:itemNum'
                                render={(props) => 
                                    <CatalogItemPage
                                        catalog={products.hoodies}
                                        itemType="Hoodies (Child)"
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
