import React, {Component} from 'react';
import {Image} from 'semantic-ui-react';
import './catalogItemPagePictures.css';


export class CatalogItemPagePictures extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            images: this.props.images,
            idx: 0
        };
    }

    render() {
        return (
            <div className='catalog-item-page-pictures'>
                <Image  
                    className='catalog-item-page-pictures__main'
                    src={this.state.images[this.state.idx]}
                    id={this.state.images.length}
                />
                <div className='catalog-item-page-pictures__previews'>
                    {this.state.images.map((image, i) => {
                        const className = i == this.state.idx ? 'catalog-item-page-pictures__clicked' : 'catalog-item-page-pictures__not-clicked';
                        return (
                            <Image
                                className={className}
                                src={image}
                                id={i}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
