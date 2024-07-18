import { Typography, Box } from '@mui/material';
import '../css/custom.css';
import '/images/test2.jpg'
const Home = () => {

  return (
    <Box
      sx={{
        backgroundImage: 'url(/images/test2.jpg)',
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