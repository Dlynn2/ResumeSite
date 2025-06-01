import { Typography, Box, Button, Stack, useTheme, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const Home = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 0,
        zIndex: 0,
        overflow: 'hidden',
        background: theme.palette.background.default,
      }}
    >
      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          textAlign: 'center',
          background: theme.palette.mode === 'dark'
            ? 'rgba(30,30,40,0.7)'
            : 'rgba(255,255,255,0.7)',
          borderRadius: 16,
          padding: 36,
          boxShadow: theme.shadows[4],
          backdropFilter: 'blur(8px)',
          position: 'relative',
          zIndex: 2,
          maxWidth: 420,
        }}
      >
        <Avatar
          alt="Dylan Lynn"
          src="/profile.jpg" // Replace with your image path or remove if not needed
          sx={{
            width: 96,
            height: 96,
            mx: 'auto',
            mb: 2,
            boxShadow: theme.shadows[2],
          }}
        />
        <Typography
          variant="h2"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 700,
            fontSize: { xs: '2.2rem', md: '2.8rem' },
          }}
        >
          Dylan Lynn
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.text.secondary,
            mb: 2,
            fontWeight: 500,
            fontSize: { xs: '1.1rem', md: '1.4rem' },
          }}
        >
          Full Stack Developer | Fitness Enthusiast | Team Player
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            mb: 3,
            fontSize: { xs: '1rem', md: '1.1rem' },
          }}
        >
          Building modern, scalable web applications with passion and precision.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
          <Button variant="contained" color="primary" href="public\Resume\ResumeSiteResume.pdf" target="_blank">
            View Resume
          </Button>
          <Button variant="outlined" color="secondary" href="mailto:Dlynn237@gmail.com">
            Contact Me
          </Button>
        </Stack>
      </motion.div>
      
    </Box>
  );
};

export default Home;