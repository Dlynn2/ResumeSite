import { Typography, Box, useTheme } from '@mui/material';
import '../css/custom.css';
import '/images/test2.jpg'
const Home = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundImage: theme.palette.mode === 'dark' ? 'url(/images/test2.jpg)' : 'url(/images/kari-shea-1SAnrIxw5OY-unsplash.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%', // Use '100vh' to fill the full viewport height
        width: '100%', // Use '100vw' to fill the full viewport width
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0',
        zIndex: 0, // Ensure content is above the background
      }}
    >
      <Typography variant="h5" component="h1" className="overlay">
        Hello, my name is Dylan Lynn. I am a
        <br />
        developer, fitness enthusiast, and team player.
      </Typography>
    </Box>
  );
};

export default Home;