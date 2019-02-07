import React, { Component } from 'react';
import './style.scss';

class GalleryItem extends Component {
	render() {
        const { image, index } = this.props;
        const { pageURL, largeImageURL } = image;
        return (
            <a
                className="Paysense-GalleryItem animated fadeInUp"
                style={{ animationDelay: (index%20)*0.1 + 's' }}
                href={pageURL}
                rel="noopener noreferrer"
                target="_blank">
                <div
                    className="Paysense-GalleryItem-bg-image"
                    style={{ 
                        backgroundImage: `url(${largeImageURL})`
                    }}
                />
            </a>
		);
	}
}

export default GalleryItem;