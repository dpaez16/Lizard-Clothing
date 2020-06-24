import React from 'react';
import {NavLink} from 'react-router-dom';
import {Dropdown, Image} from 'semantic-ui-react'
import history from './../../history';
import './navbar.css';

export const NavBar = _ => {
    return (
        <header className='navbar'>
            <div className='navbar__icon'>
                <h1>
                    <NavLink to='/'>
                        <Image
                            src={'../../lizard_clothing_logo.png'}
                        />
                    </NavLink>
                </h1>
            </div>
            <nav className='navbar__items'>
                <ul>
                    <li>
                        <Dropdown 
                            className='navbar__items__dropdown'
                            text='Products'
                        >
                            <Dropdown.Menu>
                                <Dropdown.Item  
                                    text='T-Shirts (Adult)'
                                    onMouseDown={() => history.push('/tshirts/adult')} 
                                />
                                <Dropdown.Item
                                    text='T-Shirts (Child)'
                                    onMouseDown={() => history.push('/tshirts/child')}
                                />
                                <Dropdown.Item  
                                    text='Hoodies (Adult)'
                                    onMouseDown={() => history.push('/hoodies/adult')} 
                                />
                                <Dropdown.Item
                                    text='Hoodies (Child)'
                                    onMouseDown={() => history.push('/hoodies/child')}
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
