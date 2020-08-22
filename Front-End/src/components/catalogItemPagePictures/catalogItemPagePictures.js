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

    clickPreviewImage(i) {
        this.setState({idx: i});
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
                        const clickState = i == this.state.idx ? 'clicked' : 'not-clicked';
                        const className = `catalog-item-page-pictures__${clickState}`
                        return (
                            <Image
                                className={className}
                                onMouseDown={() => this.clickPreviewImage(i)}
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
