import React, { useState, useEffect } from 'react';
import '../css/ImageSlider.css';
import { Box, Typography, useTheme } from '@mui/material'; // Import useTheme from Material-UI

type ImageSliderProps = {
  images: string[];
  descriptions: { color: string; text: string }[];
  transitionDuration?: number;
};

const ImageSlider = ({ images, descriptions, transitionDuration = 3000 }: ImageSliderProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const theme = useTheme(); // Add useTheme to get the theme object
  
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
      <Box className="image-slider">
        {images.map((image, index) => (
          <Box key={index} className={`slide ${index === currentImageIndex ? 'active' : ''}`}>
            <img src={image} alt={`Slide ${index + 1}`} />
            <Box sx={{
        position: 'absolute',
        bottom: theme.spacing(2.3),
        width: '100%',
        textAlign: 'center',
        // backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
        color: descriptions[index].color, // Assuming you still want to use a specific color from descriptions
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        // Add more theme-dependent styles here
      }}>
              <Typography>{descriptions[index].text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };
  
  export default ImageSlider;