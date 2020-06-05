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
            <Header size='huge'>
                (Lizard Clothing Logo)
            </Header>
            <p>
                (Description Here)
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