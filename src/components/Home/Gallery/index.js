import React, { Component } from 'react';
import './style.scss';
import GalleryItem from './GalleryItem';
import Loader from './Loader';

class Gallery extends Component {
	render() {
        const { images, isLoading } = this.props;

        return (
            <div className="Paysense-Gallery">
                {images.map(
                    (image, index) => (
                        <GalleryItem
                            key={image.id}
                            image={image}
                            index={index}
                        />
                    )
                )}
                { isLoading ? <Loader /> : '' }
            </div>
		);
	}
}

export default Gallery;