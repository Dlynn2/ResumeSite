import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, TextField, Typography, Box, CardMedia, useTheme } from '@mui/material';
import ImageSlider from './ImageSlider.tsx'; // Assuming ImageSlider is already using Material UI or is a custom component
import Knowledge from '/images/Knowledge.jpg';
import Outdoors from '/images/Outdoors.jpg';
import Space from '/images/Space.jpg';
import Learning from '/images/Learning.jpg';
import Failure from '/images/Failure.jpg';

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

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box>
        <ImageSlider images={images} descriptions={descriptions} />
        <Box sx={{ float: 'right' }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Astronomy picture of the day from NASA!
          </Typography>
          <TextField
            id="date"
            type="date"
            defaultValue={getDateAsString(new Date())}
            onChange={(e) => populateAPOD(new Date(e.target.value))}
            sx={{ mr: 2 }}
          />

          {!state.loading ? (
            isImage(state.APODUrl) ? (
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  image={state.APODUrl}
                  alt="APOD"
                  sx={{ width: '100%' }}
                />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '10px' }}>
                  <Typography variant="body2">{state.APODExplanation}</Typography>
                </Box>
              </Box>
            ) : (
              <iframe title="Title For IFrame" style={{ width: '100%' }} src={state.APODUrl || ''} />
            )
          ) : (
            <CircularProgress color="primary" />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Inspiration;