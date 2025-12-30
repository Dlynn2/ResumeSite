import { JSX, useEffect, useRef } from 'react';
import { Typography, Card, CardMedia, CardContent, Box, Chip, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Use public path URLs instead of imports
const CDCNLogo = '/images/CDCN_Logo.png';
const ampdLogo = '/images/logo_original.png';
const MSULogo = '/images/Montana_State_Bobcats_logo.svg.png';
const GapFillersLogo = '/images/gap-fillers-flathead-logo.png';
const FamilyTree = '/images/treeFavicon.ico';
const NewLogo = '/images/LogoNewGold.png';

interface ExperienceItemProps {
  logo: string;
  heading: string;
  description: JSX.Element;
  index: number;
}

const ExperienceItem = ({ logo, heading, description, index }: ExperienceItemProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      // Split text into characters
      const text = headingRef.current.innerText;
      headingRef.current.innerHTML = text
        .split('')
        .map((char) => `<span style="display:inline-block;transform-origin:bottom;">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      // Animate with text masking/reveal effect
      gsap.fromTo(
        headingRef.current.children,
        {
          opacity: 0,
          y: 50,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Grid container spacing={2} alignItems="center" sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card
            sx={{ backgroundColor: 'transparent', backgroundImage: 'none', boxShadow: 'none' }}
          >
            <CardMedia
              component="img"
              image={logo}
              alt={`Logo for ${heading}`}
              sx={{ width: '100%', maxHeight: 150, objectFit: 'contain', padding: 2 }}
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 8 }}>
          <CardContent sx={{ backgroundColor: 'transparent', backgroundImage: 'none' }}>
            <Typography
              ref={headingRef}
              variant="h5"
              component="h3"
              sx={{
                color: 'text.primary',
                mb: 2,
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              {heading}
            </Typography>
            <Box sx={{ color: 'text.primary' }}>{description}</Box>
          </CardContent>
        </Grid>
      </Grid>
    </motion.div>
  );
};

const Experience = () => {
  const experienceData = [
    {
      logo: FamilyTree,
      heading: 'ChilcoteFamily.com',
      description: (
        <>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label=".NET" color="primary" />
            <Chip label="Angular" color="secondary" />
            <Chip label="AWS" />
            <Chip label="Entity Framework" />
            <Chip label="CI/CD" />
          </Stack>
          <ul>
            <li>Deployed and hosted the site on a DigitalOcean droplet, ensuring high availability and performance.</li>
            <li>Implemented responsive design principles to provide an optimal viewing experience across a wide range of devices.</li>
            <li>Enhanced site security through the use of best practices in web security, including data encryption and secure authentication methods.</li>
            <li>Developed a user-friendly content management system to allow family members to easily update and manage content without technical expertise.</li>
            <li>Optimized site performance through efficient database queries and the use of caching mechanisms.</li>
            <li>Ensured data privacy by implementing strict access controls and data protection measures, in compliance with relevant regulations.</li>
            <li>Added interactive features such as a dynamic family tree visualization to enhance user engagement.</li>
            <li>Established a feedback loop with users to collect suggestions and improve the site based on user input.</li>
            <li>Leveraged .NET Core for the backend development, providing a robust and scalable architecture.</li>
            <li>Integrated AWS services for cloud storage and deployment, utilizing S3 for media storage and EC2 for application hosting.</li>
          </ul>
        </>
      ),
    },
    {
      logo: CDCNLogo,
      heading: 'Compensation Data Consulting Network',
      description: (
        <>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label=".NET" color="primary" />
            <Chip label="React" color="secondary" />
            <Chip label="C#" />
            <Chip label="Azure" />
          </Stack>
          <p>I work on the UI team with CDCN on their new product OPENComp.</p>
          <ul>
            <li>Develop user-friendly interfaces using React and TypeScript.</li>
            <li>Implement responsive design patterns to ensure seamless user experiences across devices.</li>
            <li>Collaborate with backend developers to integrate APIs and optimize data flow.</li>
            <li>Participate in code reviews and contribute to improving coding standards and best practices.</li>
            <li>Utilize Azure DevOps for continuous integration and deployment processes.</li>
            <li>Work closely with UX/UI designers to translate design mockups into functional components.</li>
            <li>Implement state management solutions using Redux to manage application state efficiently.</li>
            <li>Write unit and integration tests to ensure code quality and reliability.</li>
          </ul>
        </>
      ),
    },
    {
      logo: ampdLogo,
      heading: 'Ampd',
      description: (
        <>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Kotlin" color="primary" />
            <Chip label="Android" color="secondary" />
            <Chip label="React Native" />
          </Stack>
          <p>Ampd was a Startup that I joined out of college.</p>
          <ul>
            <li>Developed native Android applications using Kotlin, focusing on performance and user experience.</li>
            <li>Contributed to the development of cross-platform mobile applications using React Native.</li>
            <li>Implemented features such as real-time messaging, push notifications, and geolocation services.</li>
            <li>Worked in an agile environment, participating in daily stand-ups, sprint planning, and retrospectives.</li>
            <li>Collaborated with designers to create intuitive and engaging user interfaces.</li>
            <li>Integrated third-party APIs and SDKs to enhance application functionality.</li>
            <li>Optimized application performance by profiling and refactoring code.</li>
            <li>Participated in user testing sessions to gather feedback and iterate on features.</li>
          </ul>
        </>
      ),
    },
    {
      logo: NewLogo,
      heading: 'NorthCode',
      description: (
        <>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label=".NET" color="primary" />
            <Chip label="Azure" color="secondary" />
            <Chip label="React" />
            <Chip label="C#" />
          </Stack>
          <p>NorthCode is my LLC</p>
          <ul>
            <li>Build custom software that fits clients needs.</li>
            <li>Manage client relationships and project timelines to ensure timely delivery of solutions.</li>
            <li>Provide consulting services on software architecture, cloud infrastructure, and best practices.</li>
            <li>Develop full-stack applications using .NET Core and React.</li>
            <li>Implement DevOps practices, including CI/CD pipelines and automated testing.</li>
            <li>Offer maintenance and support services for existing applications.</li>
          </ul>
        </>
      ),
    },
    {
      logo: MSULogo,
      heading: 'Montana State University',
      description: (
        <>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Computer Science" color="primary" />
            <Chip label="Bachelor's Degree" color="secondary" />
          </Stack>
          <ul>
            <li>August 2017 to May 2020</li>
            <li>GPA: 3.8</li>
            <li>Graduated with Honors</li>
            <li>Relevant Coursework: Data Structures, Algorithms, Database Management, Web Development, Software Engineering, and Statistics.</li>
          </ul>
          College was a lot of work and a lot of fun!
        </>
      ),
    },
    {
      logo: GapFillersLogo,
      heading: 'Gap Fillers Flathead',
      description: (
        <>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label="HTML5" color="primary" />
            <Chip label="CSS" color="secondary" />
            <Chip label="JavaScript" />
          </Stack>
          <p>Non-profit that focuses on helping students in need particularly girls in middle school or high school.</p>
          <ul>
            <li>Created Website using HTML5, CSS, and JavaScript.</li>
            <li>Worked CSS so it is Mobile friendly.</li>
            <li>Maintain server and SEO.</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {experienceData.map((item, index) => (
        <ExperienceItem
          key={index}
          index={index}
          logo={item.logo}
          heading={item.heading}
          description={item.description}
        />
      ))}
    </Box>
  );
};

export default Experience;
