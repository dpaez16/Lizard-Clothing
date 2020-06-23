import React from 'react';
import {Header, Image} from 'semantic-ui-react';
import './homePage.css';


export const HomePage = _ => {
    const galleryImages = [
        "gallery/tshirt.jpg",
        "gallery/hoodie.jpg",
        "gallery/tshirt.jpg",
        "gallery/hoodie.jpg",
        "gallery/tshirt.jpg",
        "gallery/hoodie.jpg",
        "gallery/tshirt.jpg",
        "gallery/hoodie.jpg"
    ];

    return (
        <div className='home-page'>
            <Image
                className='home-page__logo'
                src={'../../lizard_clothing_logo.png'}
            />
            <p>
                (Lizard Clothing Description)
            </p>
            <p>
                We have a selection of custom-made T-Shirts and Hoodies 
                (under "Products"). If you don't see a particular product on here and you
                want to request a custom product, feel free to contact me (via "Special Orders").
            </p>
            <Header size='huge'>
                <u>Gallery</u>
            </Header>
            <div className='gallery'>
                {galleryImages.map((imgPath, i) => {
                    return (
                        <Image  
                            className='gallery__image'
                            src={imgPath} 
                            id={i}
                            key={i} 
                        />
                    );
                })}
            </div>
        </div>
    );
}