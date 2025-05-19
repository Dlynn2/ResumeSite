import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, TextField, Typography, Box, CardMedia, useTheme } from '@mui/material';
import ImageSlider from '../ImageSlider.tsx'; // Assuming ImageSlider is already using Material UI or is a custom component
import Knowledge from '/images/Knowledge.jpg';
import Outdoors from '/images/Outdoors.jpg';
import Space from '/images/Space.jpg';
import Learning from '/images/Learning.jpg';
import Failure from '/images/Failure.jpg';
import styles from './Inspirations.module.scss';
import { motion } from 'framer-motion';

interface IState {
  APODUrl: string;
  APODExplanation: string;
  loading: boolean;
}

const Inspiration: React.FC = () => {
  const theme = useTheme();
  const [state, setState] = useState<IState>({
    APODUrl: '',
    APODExplanation: '',
    loading: true
  });

  const populateAPOD = async (selectedDate: Date | null): Promise<string> => {
    setState({ ...state, loading: true });

    if (!selectedDate) {
      selectedDate = new Date();
    }

    try {
      const response = await fetch(`external?apodDate=${getDateAsString(selectedDate)}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      if (data.url) {
        setState({ APODUrl: data.url, APODExplanation: data.explanation, loading: false });
      }

      return data.url;
    } catch (error) {
      console.error('Error fetching APOD:', error);
      return '';
    }
  };

  const isImage = (url: string): boolean => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  const getDateAsString = (date: Date): string => {
    return date.toLocaleDateString('en-CA');
  };

  useEffect(() => {
    populateAPOD(new Date());
  }, []);

  const images = [Knowledge, Outdoors, Learning, Failure, Space];
  const descriptions = [
    { text: 'Knowledge', color: theme.palette.mode === 'dark' ? theme.palette.primary.dark : 'White' },
    { text: 'Outdoors', color: 'White' },
    { text: 'Learning', color: 'White' },
    { text: 'Failure', color: 'Black' },
    { text: 'Space', color: 'White' }
  ];

  const renderShootingStars = () => {
    const stars = [];
    for (let i = 0; i < 20; i++) {
      stars.push(<Box key={i} className={styles.shooting_star} style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}></Box>);
    }
    return stars;
  };

  return (
    <Container className={`${styles.night}`} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, position: 'relative' }}>
      <Box className={styles.rotate} sx={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
        {renderShootingStars()}
      </Box>
      <Box sx={{ width: '80%', mb: 4, zIndex: 1 }}>
        <ImageSlider images={images} descriptions={descriptions} />
      </Box>
      <Box sx={{ textAlign: 'center', mb: 4, zIndex: 1 }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'white' }}>
          Astronomy picture of the day from NASA!
        </Typography>
        <TextField
          id="date"
          type="date"
          defaultValue={getDateAsString(new Date())}
          onChange={(e) => populateAPOD(new Date(e.target.value))}
          sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1, color: 'black' }}
          className='date-picker'
        />
      </Box>
      <Box sx={{ width: '80%', zIndex: 1 }}>
        {!state.loading ? (
          isImage(state.APODUrl) ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  image={state.APODUrl}
                  alt="APOD"
                  sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
                />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '10px', borderRadius: '0 0 8px 8px' }}>
                  <Typography variant="body2">{state.APODExplanation}</Typography>
                </Box>
              </Box>
            </motion.div>
          ) : (
            <Typography variant="body2" sx={{ color: 'white' }}>{state.APODExplanation}</Typography>
          )
        ) : (
          <Typography variant="body2" sx={{ color: 'white' }}>Loading...</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Inspiration;