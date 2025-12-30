import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Container,
  TextField,
  Typography,
  Box,
  CardMedia,
  useTheme,
  CircularProgress,
  Grid,
} from '@mui/material';
import { toast } from 'react-toastify';
import styles from './Inspirations.module.scss';
import { motion } from 'framer-motion';
import { ColorModeContext } from '../../App';
import gsap from 'gsap';

interface IState {
  APODUrl: string;
  APODExplanation: string;
  loading: boolean;
}

const Inspiration: React.FC = () => {
  const theme = useTheme();
  // const [token, setToken] = useState('');
  const colorMode = useContext(ColorModeContext);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasShownToastRef = useRef(false);
  const [state, setState] = useState<IState>({
    APODUrl: '',
    APODExplanation: '',
    loading: true,
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
  }, []);

  // Separate effect to show toast only when section becomes visible
  useEffect(() => {
    if (!containerRef.current || hasShownToastRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasShownToastRef.current && theme.palette.mode === 'light') {
            hasShownToastRef.current = true;
            toast.info('Click here to experience the stars at night!', {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              toastId: 'dark-mode-recommendation',
              onClick: () => colorMode.toggleColorMode(),
            });
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [theme.palette.mode, colorMode]);

  useEffect(() => {
    // Animate stars with GSAP
    if (starsContainerRef.current) {
      const stars = starsContainerRef.current.querySelectorAll(`.${styles.shooting_star}`);
      
      stars.forEach((star) => {
        const tl = gsap.timeline({ repeat: -1, delay: Math.random() * 5 });
        
        // Set random starting position
        gsap.set(star, {
          top: `${-20 + Math.random() * 40}%`,
          left: `${-20 + Math.random() * 40}%`,
          opacity: 0,
          scale: Math.random() * 0.5 + 0.5,
          rotation: 225, // Rotated 180 degrees from original 45
        });

        // Shooting star animation at 45 degree angle
        const distance = 500 + Math.random() * 300;
        tl.to(star, {
          opacity: 1,
          duration: 0.1,
          ease: 'power1.in',
        })
        .to(star, {
          left: `+=${distance}px`,
          top: `+=${distance}px`, // Move diagonally by same amount
          duration: 1.5 + Math.random() * 1.5,
          ease: 'power1.out',
        }, '<')
        .to(star, {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.out',
        }, '-=0.3')
        .to(star, {
          delay: 2 + Math.random() * 8,
        });
      });

      // Add twinkling static stars
      const container = starsContainerRef.current;
      for (let i = 0; i < 50; i++) {
        const twinkleStar = document.createElement('div');
        twinkleStar.style.position = 'absolute';
        twinkleStar.style.width = `${1 + Math.random() * 2}px`;
        twinkleStar.style.height = `${1 + Math.random() * 2}px`;
        twinkleStar.style.backgroundColor = '#fff';
        twinkleStar.style.borderRadius = '50%';
        twinkleStar.style.top = `${Math.random() * 100}%`;
        twinkleStar.style.left = `${Math.random() * 100}%`;
        twinkleStar.style.boxShadow = '0 0 3px #fff';
        container.appendChild(twinkleStar);

        gsap.to(twinkleStar, {
          opacity: Math.random() * 0.5 + 0.3,
          duration: 0.5 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: Math.random() * 2,
        });
      }

      // Add occasional bright flash stars
      for (let i = 0; i < 5; i++) {
        const flashStar = document.createElement('div');
        flashStar.style.position = 'absolute';
        flashStar.style.width = '4px';
        flashStar.style.height = '4px';
        flashStar.style.backgroundColor = '#5f91ff';
        flashStar.style.borderRadius = '50%';
        flashStar.style.top = `${Math.random() * 100}%`;
        flashStar.style.left = `${Math.random() * 100}%`;
        flashStar.style.boxShadow = '0 0 10px #5f91ff, 0 0 20px #5f91ff';
        flashStar.style.opacity = '0';
        container.appendChild(flashStar);

        gsap.to(flashStar, {
          opacity: 1,
          scale: 1.5,
          duration: 0.2,
          repeat: -1,
          repeatDelay: 5 + Math.random() * 10,
          yoyo: true,
          ease: 'power2.inOut',
          delay: Math.random() * 5,
        });
      }
    }
  }, []); // Empty dependency array - only run on mount

  const renderShootingStars = () => {
    const stars = [];
    for (let i = 0; i < 8; i++) {
      stars.push(
        <Box
          key={i}
          className={styles.shooting_star}
        />
      );
    }
    return stars;
  };

  return (
    <Container
      ref={containerRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
      }}
    >
      <iframe
        title="Spotify Playlist"
        style={{ borderRadius: '12px', marginTop: '16px', marginBottom: '16px' }}
        src="https://open.spotify.com/embed/playlist/17mF49LR0vLzpJUa9DbD6z?utm_source=generator"
        width="80%"
        height="352"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />

      <Box
        ref={starsContainerRef}
        sx={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          pointerEvents: 'none',
          left: '-50%',
          top: '-50%',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
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
          className="date-picker"
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
                    objectFit: 'contain',
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
                  <Typography
                    variant="body2"
                    sx={{ color: 'white', background: 'rgba(0,0,0,0.5)', borderRadius: 2, p: 1 }}
                  >
                    {state.APODExplanation}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ) : (
            <Typography variant="body2" sx={{ color: 'white' }}>
              {state.APODExplanation}
            </Typography>
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
