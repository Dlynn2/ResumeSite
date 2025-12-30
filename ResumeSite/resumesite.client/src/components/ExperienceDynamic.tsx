import { useEffect, useRef, useState } from 'react';
import { Typography, Box, Chip, Stack, IconButton, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import gsap from 'gsap';

// SVG path shapes for morphing between different experiences
const svgPaths = [
  'M 100 300 Q 250 100 400 300 T 700 300', // Wavy
  'M 100 200 L 400 500 L 700 200 Z', // Triangle
  'M 100 300 C 200 100, 600 100, 700 300 C 600 500, 200 500, 100 300 Z', // Figure 8
  'M 200 200 L 600 200 L 600 400 L 200 400 Z', // Rectangle
  'M 400 150 L 500 300 L 450 450 L 350 450 L 300 300 Z', // Pentagon
  'M 100 300 Q 400 100 700 300 Q 400 500 100 300', // Hourglass
];

// Use public path URLs instead of imports
const CDCNLogo = '/images/CDCN_Logo.png';
const ampdLogo = '/images/logo_original.png';
const MSULogo = '/images/Montana_State_Bobcats_logo.svg.png';
const GapFillersLogo = '/images/gap-fillers-flathead-logo.png';
const FamilyTree = '/images/treeFavicon.ico';
const NewLogo = '/images/LogoNewGold.png';

const experienceData = [
  {
    logo: FamilyTree,
    heading: 'ChilcoteFamily.com',
    tags: ['.NET', 'Angular', 'AWS', 'Entity Framework', 'CI/CD'],
    bullets: [
      'Deployed and hosted the site on a DigitalOcean droplet, ensuring high availability and performance.',
      'Implemented responsive design principles to provide an optimal viewing experience across a wide range of devices.',
      'Enhanced site security through the use of best practices in web security, including data encryption and secure authentication methods.',
      'Developed a user-friendly content management system to allow family members to easily update and manage content without technical expertise.',
      'Optimized site performance through efficient database queries and the use of caching mechanisms.',
      'Ensured data privacy by implementing strict access controls and data protection measures, in compliance with relevant regulations.',
      'Added interactive features such as a dynamic family tree visualization to enhance user engagement.',
      'Established a feedback loop with users to collect suggestions and improve the site based on user input.',
      'Leveraged .NET Core for the backend development, providing a robust and scalable framework for server-side logic.',
      'Utilized Angular for the frontend to create a dynamic and responsive user interface, enhancing the overall user experience.',
      'Integrated Entity Framework (EF) for data access, leveraging its ORM capabilities for efficient and secure data manipulation and retrieval.',
      'Implemented CI/CD pipelines using GitHub Actions, automating the build, test, and deployment processes for increased development efficiency and reliability.',
      'Collaborated with family members to gather requirements and feedback, ensuring the site meets the needs of its users.',
    ],
  },
  {
    logo: NewLogo,
    heading: 'Resume Site',
    tags: ['React', '.NET', 'Azure', 'Serverless', 'APIs'],
    bullets: [
      'Developed a modern, responsive resume site using React for the frontend and .NET for the backend.',
      'Deployed the application using Azure App Service, leveraging Microsoft\'s cloud platform for reliable, scalable hosting.',
      'Implemented a serverless Azure database to efficiently store and retrieve site analytics data at no cost.',
      'Integrated three third-party APIs: IP Geolocation API for visitor analytics and region tracking, Weather API to retrieve real-time weather information (more analytics), and NASA Astronomy Picture of the Day API for daily space imagery and facts.',
      'Utilized caching strategies for images and data to improve site performance and reduce redundant API calls.',
      'All infrastructure and services are hosted for free using Azure\'s free tier offerings.',
      'Designed and built a custom analytics dashboard to visualize visitor data and site usage trends.',
      'Focused on cost-effective, scalable, and maintainable architecture using modern web technologies.',
    ],
  },
  {
    logo: CDCNLogo,
    heading: 'Consumer Direct Care Network',
    tags: ['Security', 'Databases', 'Agile'],
    bullets: [
      'Incorporated cybersecurity priorities into development projects to reduce potential liability and increase customer security.',
      'Created long-term development plans to optimize performance within multi-project and multi-team environments.',
      'Worked with multiple teams to create a secure and efficient database for the company.',
    ],
  },
  {
    logo: ampdLogo,
    heading: 'AMPD Engagement',
    tags: ['React', 'JavaScript', 'MySQL', 'Sequelize', 'Express'],
    bullets: [
      'Web App designed for teachers and researchers to collect and visualize data from students in their classes.',
      'Worked with team members to deliver a web application written using React, JavaScript, MySQL, Sequelize (ORM), Express (Server), and other APIs and packages.',
      'Created multiple views for different that render without refreshing.',
      'Worked with team members to create a secure and efficient database for the client.',
      'Created a secure and efficient server using Express.',
    ],
  },
  {
    logo: MSULogo,
    heading: 'Montana State University',
    tags: ['Computer Science', 'Statistics', 'GPA: 3.8'],
    bullets: [
      'Montana State University - Bozeman, MT',
      'August 2017 to May 2020',
      'GPA: 3.8',
      'Graduated with Honors',
      'Relevant Coursework: Data Structures, Algorithms, Database Management, Web Development, Software Engineering, and Statistics.',
      'College was a lot of work and a lot of fun!',
    ],
  },
  {
    logo: GapFillersLogo,
    heading: 'Gap Fillers Flathead',
    tags: ['HTML5', 'CSS', 'JavaScript'],
    bullets: [
      'Non-profit that focuses on helping students in need particularly girls in middle school or high school.',
      'Created Website using HTML5, CSS, and JavaScript.',
      'Worked CSS so it is Mobile friendly.',
      'Maintain server and SEO.',
    ],
  },
];
      
const ExperienceDynamic = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const backgroundRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  const current = experienceData[currentIndex];

  const morphToNext = (direction: 'next' | 'prev') => {
    const newIndex =
      direction === 'next'
        ? (currentIndex + 1) % experienceData.length
        : (currentIndex - 1 + experienceData.length) % experienceData.length;

    // Create timeline for smooth transitions
    const tl = gsap.timeline();

    // Animate out current content
    tl.to(contentRef.current, {
      opacity: 0,
      x: direction === 'next' ? -50 : 50,
      duration: 0.3,
      ease: 'power2.in',
    })
      .to(logoRef.current, {
        scale: 0,
        rotation: direction === 'next' ? 180 : -180,
        duration: 0.3,
        ease: 'back.in(1.7)',
      }, '<')
      .to(headingRef.current?.children || [], {
        opacity: 0,
        y: -20,
        stagger: 0.02,
        duration: 0.2,
      }, '<')
      // Morph SVG path to next shape
      .to(pathRef.current, {
        attr: { d: svgPaths[newIndex] },
        duration: 0.8,
        ease: 'power2.inOut',
      }, '<')
      // Pulse circle
      .to(circleRef.current, {
        attr: { r: 200 },
        duration: 0.4,
        ease: 'power2.in',
      }, '<')
      .to(circleRef.current, {
        attr: { r: 150 },
        duration: 0.4,
        ease: 'power2.out',
      })
      // Rotate background
      .to(backgroundRef.current, {
        rotation: direction === 'next' ? '+=60' : '-=60',
        duration: 0.8,
        ease: 'power2.inOut',
      }, '<-0.8')
      // Update content
      .add(() => {
        setCurrentIndex(newIndex);
      })
      // Animate in new content
      .fromTo(
        contentRef.current,
        { opacity: 0, x: direction === 'next' ? 50 : -50 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      )
      .fromTo(
        logoRef.current,
        { scale: 0, rotation: direction === 'next' ? -180 : 180 },
        { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(1.7)' },
        '<'
      );
  };

  useEffect(() => {
    // Animate heading letters on mount and when index changes
    if (headingRef.current) {
      const text = headingRef.current.innerText;
      headingRef.current.innerHTML = text
        .split('')
        .map(
          (char) =>
            `<span style="display:inline-block;opacity:0;transform:translateY(20px);">${char === ' ' ? '&nbsp;' : char}</span>`
        )
        .join('');

      gsap.to(headingRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: 'back.out(1.7)',
        delay: 0.2,
      });
    }
  }, [currentIndex]);

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 900,
        mx: 'auto',
        p: 4,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      {/* Animated SVG Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.1,
          zIndex: 0,
        }}
      >
        <svg
          ref={backgroundRef}
          width="100%"
          height="100%"
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: theme.palette.primary.main, stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: theme.palette.secondary.main, stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          {/* Morphing path */}
          <path
            ref={pathRef}
            d={svgPaths[currentIndex]}
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="4"
          />
          {/* Animated circle */}
          <circle 
            ref={circleRef}
            cx="400" 
            cy="300" 
            r="150" 
            fill="url(#grad1)" 
            opacity="0.3"
          />
        </svg>
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          transform: 'translateY(-50%)',
          display: 'flex',
          justifyContent: 'space-between',
          px: 2,
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={() => morphToNext('prev')}
          sx={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[4],
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          onClick={() => morphToNext('next')}
          sx={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[4],
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <img
            ref={logoRef}
            src={current.logo}
            alt={current.heading}
            style={{
              maxWidth: 150,
              maxHeight: 150,
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* Heading */}
        <Typography
          ref={headingRef}
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 3,
            color: theme.palette.text.primary,
            fontWeight: 700,
          }}
        >
          {current.heading}
        </Typography>

        {/* Tags */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 3, flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}
        >
          {current.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              color={index % 2 === 0 ? 'primary' : 'secondary'}
              sx={{ fontWeight: 500 }}
            />
          ))}
        </Stack>

        {/* Bullets */}
        <Box ref={contentRef}>
          <ul style={{ color: theme.palette.text.primary, lineHeight: 1.8 }}>
            {current.bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        </Box>

        {/* Progress Indicator */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Stack direction="row" spacing={1} justifyContent="center">
            {experienceData.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor:
                    index === currentIndex
                      ? theme.palette.primary.main
                      : theme.palette.text.disabled,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (index !== currentIndex) {
                    morphToNext(index > currentIndex ? 'next' : 'prev');
                  }
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default ExperienceDynamic;
