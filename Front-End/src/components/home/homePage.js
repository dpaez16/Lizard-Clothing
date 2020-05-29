import React from 'react';
import {Header} from 'semantic-ui-react';
import './homePage.css';


export const HomePage = _ => {
    return (
        <div className='home-page'>
            <Header size='huge'>
                Lizard Clothing
            </Header>
            <p>
                (Description Here)
            </p>
            <Header size='huge'>
                <u>Gallery</u>:
            </Header>
        </div>
    );
}