import { Box, Typography, Button, Stack, TextField, useTheme, Paper, Alert, CircularProgress } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

function Contact() {
  const theme = useTheme();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again or contact me directly via email.');
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography
        variant="h3"
        sx={{
          mb: 3,
          color: theme.palette.text.primary,
          fontWeight: 600,
        }}
      >
        Want to know more? Let's Connect!
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: theme.palette.text.secondary,
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
      </Typography>

      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          p: 4,
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(30, 30, 40, 0.8)' 
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {success && (
              <Alert severity="success" onClose={() => setSuccess(false)}>
                Message sent successfully! I'll get back to you soon.
              </Alert>
            )}
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}
            
            <TextField
              fullWidth
              label="Your Name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange('name')}
              disabled={loading}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                },
              }}
            />
            <TextField
              fullWidth
              label="Your Email"
              variant="outlined"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              disabled={loading}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                },
              }}
            />
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange('message')}
              disabled={loading}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <EmailIcon />}
              disabled={loading}
              sx={{
                py: 1.5,
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                '&:hover': {
                  boxShadow: theme.shadows[8],
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease',
                },
                '&:disabled': {
                  background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.5) 0%, rgba(168, 85, 247, 0.5) 100%)',
                },
              }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </Stack>
        </form>
      </Paper>

      <Stack 
        direction="row" 
        spacing={3} 
        justifyContent="center" 
        sx={{ mt: 6 }}
      >
        <Button
          variant="outlined"
          startIcon={<EmailIcon />}
          href="mailto:Dlynn237@gmail.com"
          sx={{
            borderWidth: 2,
            '&:hover': { borderWidth: 2 },
          }}
        >
          Email
        </Button>
        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          href="https://github.com/Dlynn2"
          target="_blank"
          sx={{
            borderWidth: 2,
            '&:hover': { borderWidth: 2 },
          }}
        >
          GitHub
        </Button>
        <Button
          variant="outlined"
          startIcon={<LinkedInIcon />}
          href="https://www.linkedin.com/in/dylan-lynn-47b76965/"
          target="_blank"
          sx={{
            borderWidth: 2,
            '&:hover': { borderWidth: 2 },
          }}
        >
          LinkedIn
        </Button>
      </Stack>
    </Box>
  );
}

export default Contact;
