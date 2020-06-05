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
                    <NavLink to='/'>Lizard Clothing</NavLink>
                </h1>
            </div>
            <nav className='navbar__items'>
                <ul>
                    <li>
                        <Dropdown text='Products'>
                            <Dropdown.Menu>
                                <Dropdown.Item  
                                    text='T-Shirts'
                                    onMouseDown={() => history.push('/tshirts')} 
                                />
                                <Dropdown.Item  
                                    text='Hoodies'
                                    onMouseDown={() => history.push('/hoodies')} 
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
                                <i class="instagram icon" />
                            </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
