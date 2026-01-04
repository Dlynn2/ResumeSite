import { useEffect, useRef, useState, useCallback } from 'react';
import { Typography, Box, Button, Stack, useTheme, Avatar, Container, useMediaQuery } from '@mui/material';
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
  const isMobile = useMediaQuery('(max-width:768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const inspirationRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [sectionsVisible, setSectionsVisible] = useState<Set<string>>(new Set());

  // Intersection Observer for mobile CSS animations
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setSectionsVisible(prev => new Set([...prev, entry.target.className]));
      }
    });
  }, []);

  useEffect(() => {
    // For mobile: Use Intersection Observer with CSS animations (more reliable on touch devices)
    if (isMobile || prefersReducedMotion) {
      const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      });

      const sections = document.querySelectorAll('.skills-section, .experience-section, .inspiration-section, .analytics-section, .contact-section');
      sections.forEach(section => observer.observe(section));

      // Simple hero animation for mobile
      gsap.fromTo('.hero-content', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );

      // Animate name on mobile with simpler fade-in animation (no letter-by-letter to avoid issues)
      if (nameRef.current) {
        nameRef.current.textContent = 'Dylan Lynn';
        nameRef.current.style.opacity = '0';
        nameRef.current.style.transform = 'translateY(15px)';
        
        setTimeout(() => {
          if (nameRef.current) {
            nameRef.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            nameRef.current.style.opacity = '1';
            nameRef.current.style.transform = 'translateY(0)';
          }
        }, 400);
      }

      return () => observer.disconnect();
    }

    // Desktop: Full GSAP animations
    gsap.set('.skills-section, .experience-section, .inspiration-section, .analytics-section, .contact-section', {
      opacity: 1,
    });

    const tl = gsap.timeline();

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

    tl.fromTo('.hero-content', 
      { opacity: 0, y: 100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out'
      }
    )
    .add(() => animateName(), '+=0.2');

    // Floating animation for avatar (works on both)
    gsap.to('.hero-avatar', {
      y: -20,
      duration: 2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Desktop scroll animations with toggle instead of scrub for better performance
    const createScrollAnimation = (selector: string, fromVars: gsap.TweenVars, toVars: gsap.TweenVars) => {
      gsap.fromTo(selector, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: selector,
          start: 'top 85%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });
    };

    createScrollAnimation('.skills-section', { y: 60, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' });
    createScrollAnimation('.experience-section', { y: 60, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' });
    createScrollAnimation('.inspiration-section', { scale: 0.95, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' });
    createScrollAnimation('.analytics-section', { x: -40, opacity: 0.5 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' });
    createScrollAnimation('.contact-section', { y: 60, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' });

    // Parallax effect for backgrounds (desktop only)
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile, prefersReducedMotion, observerCallback]);

  // Helper to check if section is visible (for mobile CSS animations)
  const isSectionVisible = (sectionClass: string) => {
    return Array.from(sectionsVisible).some(s => s.includes(sectionClass));
  };

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
          // Animated gradient overlay for stunning effect
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(168, 85, 247, 0.3), transparent)'
              : 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124, 58, 237, 0.15), transparent)',
            animation: 'shimmer 8s ease-in-out infinite',
            pointerEvents: 'none',
          },
        }}
      >
        {/* Floating particles for stunning effect */}
        {!isMobile && [...Array(6)].map((_, i) => (
          <Box
            key={i}
            className="floating-particle"
            sx={{
              position: 'absolute',
              width: { xs: 4, md: 6 },
              height: { xs: 4, md: 6 },
              borderRadius: '50%',
              background: theme.palette.mode === 'dark'
                ? `rgba(168, 85, 247, ${0.3 + i * 0.1})`
                : `rgba(124, 58, 237, ${0.2 + i * 0.08})`,
              top: `${15 + i * 12}%`,
              left: `${10 + i * 15}%`,
              animation: `particle${i % 3} ${6 + i * 2}s ease-in-out infinite`,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 0 20px rgba(168, 85, 247, 0.5)'
                : '0 0 15px rgba(124, 58, 237, 0.3)',
            }}
          />
        ))}

        {/* Animated background gradient orbs */}
        <Box
          className="parallax-bg"
          sx={{
            position: 'absolute',
            top: { xs: -50, md: -100 },
            left: { xs: -50, md: -100 },
            width: { xs: 300, md: 600 },
            height: { xs: 300, md: 600 },
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
            bottom: { xs: -50, md: -100 },
            right: { xs: -50, md: -100 },
            width: { xs: 250, md: 500 },
            height: { xs: 250, md: 500 },
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />

        {/* Hero Content */}
        <Box className="hero-content" sx={{ 
          textAlign: 'center', 
          zIndex: 2, 
          maxWidth: 800, 
          px: { xs: 2, sm: 3 },
          width: '100%',
        }}>
          <Avatar
            alt="Dylan Lynn"
            src="/images/profileAvatar.png"
            className="hero-avatar"
            sx={{
              width: { xs: 100, sm: 120, md: 150 },
              height: { xs: 100, sm: 120, md: 150 },
              mx: 'auto',
              mb: { xs: 2, md: 3 },
              boxShadow: theme.shadows[10],
              border: `4px solid ${theme.palette.primary.main}`,
              // Glow effect
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: -8,
                borderRadius: '50%',
                background: 'transparent',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 0 40px rgba(168, 85, 247, 0.4)'
                  : '0 0 30px rgba(124, 58, 237, 0.25)',
              },
            }}
          />
          <Typography
            ref={nameRef}
            variant="h1"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 800,
              fontSize: { xs: '2.2rem', sm: '3rem', md: '5rem' },
              mb: { xs: 1.5, md: 2 },
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #a855f7 0%, #fbbf24 100%)'
                : 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              // Shimmer animation for name
              backgroundSize: '200% 200%',
              animation: 'gradientShift 4s ease infinite',
              minHeight: { xs: 50, md: 80 },
            }}
          >
            {/* Text will be injected by animation */}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.text.secondary,
              mb: { xs: 2, md: 3 },
              fontWeight: 500,
              fontSize: { xs: '0.95rem', sm: '1.2rem', md: '1.8rem' },
              lineHeight: { xs: 1.4, md: 1.3 },
              px: { xs: 1, md: 0 },
            }}
          >
            Full Stack Developer | Fitness Enthusiast | Team Player
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              mb: { xs: 3, md: 4 },
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
              maxWidth: 600,
              mx: 'auto',
              px: { xs: 1, md: 0 },
            }}
          >
            Building modern, scalable web applications with passion and precision.
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 1.5, sm: 2 }} 
            justifyContent="center" 
            mb={{ xs: 3, md: 4 }}
            sx={{ width: '100%', px: { xs: 2, md: 0 } }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                px: { xs: 3, md: 4 },
                py: { xs: 1.2, md: 1.5 },
                borderRadius: 2,
                fontSize: { xs: '1rem', md: '1.1rem' },
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                boxShadow: theme.shadows[8],
                transition: 'all 0.3s ease',
                // Touch-friendly tap effect
                '&:active': {
                  transform: 'scale(0.98)',
                },
                '&:hover': {
                  boxShadow: theme.shadows[12],
                  transform: 'translateY(-2px)',
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
                px: { xs: 3, md: 4 },
                py: { xs: 1.2, md: 1.5 },
                borderRadius: 2,
                fontSize: { xs: '1rem', md: '1.1rem' },
                borderWidth: 2,
                transition: 'all 0.3s ease',
                '&:active': {
                  transform: 'scale(0.98)',
                },
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                },
              }}
              href="#contact"
            >
              Contact Me
            </Button>
          </Stack>
          <Box sx={{ mt: { xs: 2, md: 4 }, mb: { xs: 6, md: 10 } }}>
            <GitHubCommits />
          </Box>
        </Box>

        {/* Scroll indicator - hidden on mobile for cleaner look */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 20, md: 40 },
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s ease-in-out infinite',
            zIndex: 3,
            display: { xs: 'none', sm: 'block' },
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
        className={`skills-section ${isMobile && isSectionVisible('skills') ? 'mobile-visible' : ''}`}
        sx={{
          minHeight: { xs: 'auto', md: '100vh' },
          py: { xs: 6, md: 10 },
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)'
            : 'linear-gradient(180deg, #fef3c7 0%, #e0e7ff 100%)',
          position: 'relative',
          zIndex: 1,
          // Mobile animation styles
          ...(isMobile && {
            opacity: isSectionVisible('skills') ? 1 : 0,
            transform: isSectionVisible('skills') ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }),
        }}
      >
        <Container maxWidth="lg" sx={{ backgroundColor: 'transparent', px: { xs: 2, md: 3 } }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: { xs: 4, md: 6 },
              fontWeight: 700,
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
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
        className={`experience-section ${isMobile && isSectionVisible('experience') ? 'mobile-visible' : ''}`}
        sx={{
          minHeight: { xs: 'auto', md: '100vh' },
          py: { xs: 6, md: 10 },
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(180deg, #e0e7ff 0%, #f8fafc 100%)',
          position: 'relative',
          zIndex: 1,
          ...(isMobile && {
            opacity: isSectionVisible('experience') ? 1 : 0,
            transform: isSectionVisible('experience') ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s',
          }),
        }}
      >
        <Container maxWidth="lg" sx={{ backgroundColor: 'transparent', px: { xs: 2, md: 3 } }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: { xs: 4, md: 6 },
              fontWeight: 700,
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
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
        className={`inspiration-section ${isMobile && isSectionVisible('inspiration') ? 'mobile-visible' : ''}`}
        sx={{
          minHeight: { xs: 'auto', md: '100vh' },
          py: { xs: 6, md: 10 },
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #1e293b 0%, #1e1b4b 100%)'
            : 'linear-gradient(180deg, #f8fafc 0%, #fef3c7 100%)',
          position: 'relative',
          zIndex: 1,
          ...(isMobile && {
            opacity: isSectionVisible('inspiration') ? 1 : 0,
            transform: isSectionVisible('inspiration') ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }),
        }}
      >
        <Container maxWidth="lg" sx={{ backgroundColor: 'transparent', px: { xs: 2, md: 3 } }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: { xs: 4, md: 6 },
              fontWeight: 700,
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
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
        className={`analytics-section ${isMobile && isSectionVisible('analytics') ? 'mobile-visible' : ''}`}
        sx={{
          minHeight: { xs: 'auto', md: '100vh' },
          py: { xs: 6, md: 10 },
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)'
            : 'linear-gradient(180deg, #fef3c7 0%, #e0e7ff 100%)',
          position: 'relative',
          zIndex: 1,
          ...(isMobile && {
            opacity: isSectionVisible('analytics') ? 1 : 0,
            transform: isSectionVisible('analytics') ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }),
        }}
      >
        <Container maxWidth="lg" sx={{ backgroundColor: 'transparent', px: { xs: 2, md: 3 } }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: { xs: 4, md: 6 },
              fontWeight: 700,
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
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
        className={`contact-section ${isMobile && isSectionVisible('contact') ? 'mobile-visible' : ''}`}
        sx={{
          minHeight: { xs: 'auto', md: '100vh' },
          py: { xs: 6, md: 10 },
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)'
            : 'linear-gradient(180deg, #e0e7ff 0%, #fef3c7 100%)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          ...(isMobile && {
            opacity: isSectionVisible('contact') ? 1 : 0,
            transform: isSectionVisible('contact') ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }),
        }}
      >
        <Container maxWidth="lg" sx={{ backgroundColor: 'transparent', px: { xs: 2, md: 3 } }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: { xs: 4, md: 6 },
              fontWeight: 700,
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
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

      {/* Global animations - optimized for mobile */}
      <style>
        {`
          /* Background orb floating */
          @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(30px, 30px); }
          }
          
          /* Scroll indicator bounce */
          @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-10px); }
          }
          
          /* Scroll indicator dot */
          @keyframes scroll {
            0% { opacity: 0; transform: translateX(-50%) translateY(0); }
            50% { opacity: 1; }
            100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
          }
          
          /* Gradient shimmer effect */
          @keyframes shimmer {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          
          /* Gradient shift for name */
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          /* Floating particles */
          @keyframes particle0 {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
            25% { transform: translate(20px, -30px) scale(1.2); opacity: 1; }
            50% { transform: translate(-10px, -50px) scale(0.8); opacity: 0.8; }
            75% { transform: translate(30px, -20px) scale(1.1); opacity: 0.9; }
          }
          
          @keyframes particle1 {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
            33% { transform: translate(-30px, 20px) scale(1.3); opacity: 1; }
            66% { transform: translate(20px, 40px) scale(0.9); opacity: 0.7; }
          }
          
          @keyframes particle2 {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
            50% { transform: translate(40px, -40px) scale(1.2); opacity: 1; }
          }
          
          /* Mobile-specific optimizations */
          @media (max-width: 768px) {
            @keyframes float {
              0%, 100% { transform: translate(0, 0); }
              50% { transform: translate(15px, 15px); }
            }
          }
          
          /* Respect reduced motion preferences */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default SinglePageHome;
