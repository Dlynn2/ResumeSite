import React, { useState, useEffect } from 'react';
import '../css/ImageSlider.css';

const ImageSlider = ({ images, descriptions, transitionDuration = 3000 }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, transitionDuration);
  
      return () => clearInterval(intervalId);
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentImageIndex, images, transitionDuration]);
  
    return (
      <div className="image-slider">
        {images.map((image, index) => (
          <div key={index} className={`slide ${index === currentImageIndex ? 'active' : ''}`}>
            <img src={image} alt={`Slide ${index + 1}`} />
            <div className="description" style={{ color: descriptions[index].color }}>
              <p>{descriptions[index].text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ImageSlider;