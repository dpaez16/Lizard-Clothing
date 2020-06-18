import React from 'react';
import {NavLink} from 'react-router-dom';
import {Dropdown} from 'semantic-ui-react'
import history from './../../history';
import './navbar.css';

export const NavBar = _ => {
    return (
        <header className='navbar'>
            <div className='navbar__icon'>
                <h1>
                    <NavLink to='/'>(Lizard Clothing Logo)</NavLink>
                </h1>
            </div>
            <nav className='navbar__items'>
                <ul>
                    <li>
                        <Dropdown text='Products'>
                            <Dropdown.Menu>
                                <Dropdown.Item  
                                    text='T-Shirts (Adult)'
                                    onMouseDown={() => history.push('/tshirts')} 
                                />
                                <Dropdown.Item
                                    text='T-Shirts (Children)'
                                />
                                <Dropdown.Item  
                                    text='Hoodies (Adult)'
                                    onMouseDown={() => history.push('/hoodies')} 
                                />
                                <Dropdown.Item
                                    text='Hoodies (Children)'
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                    <li>
                        <NavLink to='/specialOrders'>Special Orders</NavLink>
                    </li>
                    <li>
                            <a
                                href='https://www.instagram.com/' 
                                target="_blank"
                            >
                                <i className="instagram icon" />
                            </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
