import { useEffect, useRef } from 'react';
import { Typography, Box, Button, Stack, useTheme, Avatar, Container } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GitHubCommits from './GitHubCommits';
import TabbedGauge from './Gauge';
import ExperienceDynamic from './ExperienceDynamic';
import Inspiration from './inspiration/Inspirations';
import Analytics from './Analytics/Analytics';
import Contact from './Contact';

gsap.registerPlugin(ScrollTrigger);

const SinglePageHome = () => {
  const theme = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const inspirationRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Set initial states to visible
    gsap.set('.skills-section, .experience-section, .inspiration-section, .analytics-section, .contact-section', {
      opacity: 1,
    });

    // Create a master timeline
    const tl = gsap.timeline();

    // Split text animation for name
    const animateName = () => {
      if (nameRef.current) {
        const text = 'Dylan Lynn';
        nameRef.current.innerHTML = text
          .split('')
          .map((char) => `<span style="display:inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');

        gsap.fromTo(nameRef.current.children, 
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            clearProps: 'all',
          }
        );
      }
    };

    // Hero section animations - hero fades in, then name animates
    tl.fromTo('.hero-content', 
      { opacity: 0, y: 100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out'
      }
    )
    .add(() => animateName(), '+=0.2'); // Animate name 0.2s after hero appears

    // Floating animation for avatar
    gsap.to('.hero-avatar', {
      y: -20,
      duration: 2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Skills section animation
    gsap.fromTo('.skills-section', 
      { y: 100 },
      {
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 90%',
          end: 'top 30%',
          scrub: 1,
        },
        y: 0,
      }
    );

    // Experience section animation with stagger
    gsap.fromTo('.experience-section',
      { y: 100 },
      {
        scrollTrigger: {
          trigger: '.experience-section',
          start: 'top 90%',
          end: 'top 30%',
          scrub: 1,
        },
        y: 0,
      }
    );

    // Inspiration section animation
    gsap.fromTo('.inspiration-section',
      { scale: 0.9 },
      {
        scrollTrigger: {
          trigger: '.inspiration-section',
          start: 'top 90%',
          end: 'top 30%',
          scrub: 1,
        },
        scale: 1,
      }
    );

    // Analytics section animation
    gsap.fromTo('.analytics-section',
      { x: -100 },
      {
        scrollTrigger: {
          trigger: '.analytics-section',
          start: 'top 90%',
          end: 'top 30%',
          scrub: 1,
        },
        x: 0,
      }
    );

    // Contact section animation
    gsap.fromTo('.contact-section',
      { y: 100 },
      {
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 90%',
          end: 'top 30%',
          scrub: 1,
        },
        y: 0,
      }
    );

    // Parallax effect for backgrounds
    gsap.to('.parallax-bg', {
      scrollTrigger: {
        trigger: '.parallax-bg',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: 300,
      ease: 'none',
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Box sx={{ 
      width: '100%', 
      overflow: 'visible',
      backgroundColor: 'transparent',
      '& *': {
        boxSizing: 'border-box',
      }
    }}>
      {/* Hero Section */}
      <Box
        id="home"
        ref={heroRef}
        sx={{
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)'
            : 'linear-gradient(180deg, #f8fafc 0%, #fef3c7 100%)',
        }}
      >
        {/* Animated background gradient orbs */}
        <Box
          className="parallax-bg"
          sx={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 600,
            height: 600,
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 500,
            height: 500,
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />

        {/* Hero Content */}
        <Box className="hero-content" sx={{ textAlign: 'center', zIndex: 2, maxWidth: 800, px: 3 }}>
          <Avatar
            alt="Dylan Lynn"
            src="/images/profileAvatar.png"
            className="hero-avatar"
            sx={{
              width: { xs: 120, md: 150 },
              height: { xs: 120, md: 150 },
              mx: 'auto',
              mb: 3,
              boxShadow: theme.shadows[10],
              border: `4px solid ${theme.palette.primary.main}`,
            }}
          />
          <Typography
            ref={nameRef}
            variant="h1"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 800,
              fontSize: { xs: '3rem', md: '5rem' },
              mb: 2,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #a855f7 0%, #fbbf24 100%)'
                : 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {/* Text will be injected by animation */}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.text.secondary,
              mb: 3,
              fontWeight: 500,
              fontSize: { xs: '1.2rem', md: '1.8rem' },
            }}
          >
            Full Stack Developer | Fitness Enthusiast | Team Player
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              fontSize: { xs: '1rem', md: '1.2rem' },
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Building modern, scalable web applications with passion and precision.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" mb={4}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                boxShadow: theme.shadows[8],
                '&:hover': {
                  boxShadow: theme.shadows[12],
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease',
                },
              }}
              href="/Resume/ResumeSiteResume.pdf"
              target="_blank"
            >
              View Resume
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1.1rem',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease',
                },
              }}
              href="#contact"
            >
              Contact Me
            </Button>
          </Stack>
          <Box sx={{ mt: 4, mb: 10 }}>
            <GitHubCommits />
          </Box>
        </Box>

        {/* Scroll indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s ease-in-out infinite',
            zIndex: 3,
          }}
        >
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mb: 1, display: 'block' }}>
            Scroll to explore
          </Typography>
          <Box
            sx={{
              width: 30,
              height: 50,
              border: `2px solid ${theme.palette.text.secondary}`,
              borderRadius: 20,
              position: 'relative',
              mx: 'auto',
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 10,
                background: theme.palette.primary.main,
                borderRadius: 3,
                position: 'absolute',
                top: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'scroll 1.5s ease-in-out infinite',
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Skills Section */}
      <Box
        id="skills"
        ref={skillsRef}
        className="skills-section"
        sx={{
          minHeight: '100vh',
          py: 10,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)'
            : 'linear-gradient(180deg, #fef3c7 0%, #e0e7ff 100%)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg" sx={{ backgroundColor: 'transparent' }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #fbbf24 0%, #a855f7 100%)'
                : 'linear-gradient(135deg, #f59e0b 0%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Skills & Expertise
          </Typography>
          <TabbedGauge />
        </Container>
      </Box>

      {/* Experience Section */}
      <Box
        id="experience"
        ref={experienceRef}
        className="experience-section"
        sx={{
          minHeight: '100vh',
          py: 10,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(180deg, #e0e7ff 0%, #f8fafc 100%)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg" sx={{ backgroundColor: 'transparent' }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #a855f7 0%, #fbbf24 100%)'
                : 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Experience
          </Typography>
          <ExperienceDynamic />
        </Container>
      </Box>

      {/* Inspiration Section */}
      <Box
        id="inspiration"
        ref={inspirationRef}
        className="inspiration-section"
        sx={{
          minHeight: '100vh',
          py: 10,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #1e293b 0%, #1e1b4b 100%)'
            : 'linear-gradient(180deg, #f8fafc 0%, #fef3c7 100%)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg" sx={{ backgroundColor: 'transparent' }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #fbbf24 0%, #a855f7 100%)'
                : 'linear-gradient(135deg, #f59e0b 0%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Inspiration
          </Typography>
          <Inspiration />
        </Container>
      </Box>

      {/* Analytics Section */}
      <Box
        id="analytics"
        ref={analyticsRef}
        className="analytics-section"
        sx={{
          minHeight: '100vh',
          py: 10,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)'
            : 'linear-gradient(180deg, #fef3c7 0%, #e0e7ff 100%)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg" sx={{ backgroundColor: 'transparent' }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #a855f7 0%, #fbbf24 100%)'
                : 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Analytics
          </Typography>
          <Analytics />
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        id="contact"
        ref={contactRef}
        className="contact-section"
        sx={{
          minHeight: '100vh',
          py: 10,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)'
            : 'linear-gradient(180deg, #e0e7ff 0%, #fef3c7 100%)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg" sx={{ backgroundColor: 'transparent' }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #a855f7 0%, #fbbf24 100%)'
                : 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Get In Touch
          </Typography>
          <Contact />
        </Container>
      </Box>

      {/* Global animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(50px, 50px); }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-10px); }
          }
          
          @keyframes scroll {
            0% { opacity: 0; transform: translateX(-50%) translateY(0); }
            50% { opacity: 1; }
            100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
          }
        `}
      </style>
    </Box>
  );
};

export default SinglePageHome;
