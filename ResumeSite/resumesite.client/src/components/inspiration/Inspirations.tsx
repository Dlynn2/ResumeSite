import React, { useState, useEffect, useContext } from 'react';
import { Container, TextField, Typography, Box, CardMedia, useTheme, CircularProgress, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import styles from './Inspirations.module.scss';
import { motion } from 'framer-motion';
import { ColorModeContext } from '../../App';

interface IState {
  APODUrl: string;
  APODExplanation: string;
  loading: boolean;
}

const Inspiration: React.FC = () => {
  const theme = useTheme();
  // const [token, setToken] = useState('');
  const colorMode = useContext(ColorModeContext);
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

  // async function getToken() {
  //   const response = await fetch('/external/spotifyToken');
  //   const json = await response.json();
  //   setToken(json.access_token);
  // }

  const isImage = (url: string): boolean => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  const getDateAsString = (date: Date): string => {
    return date.toLocaleDateString('en-CA');
  };

  useEffect(() => {
    // getToken();
    populateAPOD(new Date());

    if (theme.palette.mode === 'light') {
      toast.info('Click here to experience the stars at night!', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: 'dark-mode-recommendation', // prevents duplicate toasts
        onClick: () => colorMode.toggleColorMode()
      });
    }
  }, [theme.palette.mode]);

  const renderShootingStars = () => {
    const stars = [];
    for (let i = 0; i < 20; i++) {
      stars.push(
        <Box
          key={i}
          className={styles.shooting_star}
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`
          }}
        />);
    }
    return stars;
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
      }}
    >

      <iframe
        style={{ borderRadius: '12px', marginTop: '16px', marginBottom: '16px' }}
        src="https://open.spotify.com/embed/playlist/17mF49LR0vLzpJUa9DbD6z?utm_source=generator"
        width="80%"
        height="352"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />

      <Box className={styles.rotate} sx={{ position: 'absolute', width: '100%', height: 'calc(100vh - 64px)', pointerEvents: 'none', left:'-10%' }}>
        {renderShootingStars()}
      </Box>
      <Box sx={{ textAlign: 'center', mb: 4, zIndex: 1 }}>
        <Typography variant="h5" sx={{ mb: 2, color: theme.palette.text.primary }}>
          Astronomy picture of the day from NASA!
        </Typography>
        <TextField
          id="date"
          type="date"
          defaultValue={getDateAsString(new Date())}
          onChange={(e) => populateAPOD(new Date(e.target.value))}
          sx={{
            mb: 2,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
            color: theme.palette.text.primary,
            input: { color: theme.palette.text.primary },
            '& .MuiInputBase-input': { color: theme.palette.text.primary },
            // This targets the calendar icon for the date picker
            '& .MuiSvgIcon-root': {
              color: theme.palette.text.primary,
            },
            // For some browsers, the native date icon is not an SVG, so use filter as fallback
            '& input[type="date"]::-webkit-calendar-picker-indicator': {
              filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
            },
          }}
          className='date-picker'
        />
      </Box>
      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', zIndex: 1, marginBottom: '64px' }}>
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
                  sx={{
                    width: '100%',
                    maxHeight: 500,
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: 3,
                    objectFit: 'contain'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    padding: { xs: '6px', sm: '10px' },
                    borderRadius: '0 0 8px 8px',
                    fontSize: { xs: '0.85rem', sm: '1rem' },
                    maxHeight: { xs: 80, sm: 120 },
                    overflowY: 'auto',
                    // Hide overlay on very small screens, show below image instead
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  <Typography variant="body2">{state.APODExplanation}</Typography>
                </Box>
                {/* Show explanation below image on xs screens */}
                <Box sx={{ display: { xs: 'block', sm: 'none' }, mt: 1 }}>
                  <Typography variant="body2" sx={{ color: 'white', background: 'rgba(0,0,0,0.5)', borderRadius: 2, p: 1 }}>
                    {state.APODExplanation}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ) : (
            <Typography variant="body2" sx={{ color: 'white' }}>{state.APODExplanation}</Typography>
          )
        ) : (
          <Grid container justifyContent="center" alignItems="center" style={{ minHeight: 200 }}>
            <CircularProgress />
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Inspiration;