import { useState, useEffect, useRef } from 'react';
import { Tabs, Tab, Typography, useTheme } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { motion } from 'framer-motion';

const tabData = [
  { label: '.Net', value: 90, description: "Expert in .NET Core and ASP.NET for building scalable web APIs and enterprise applications." },
  { label: 'Java', value: 60, description: "Solid experience with Java for backend services, Android apps, and cross-platform solutions." },
  { label: 'Python', value: 40, description: "Used Python for scripting, automation, and data analysis tasks." },
  { label: 'SQL', value: 60, description: "Proficient in SQL for designing, querying, and optimizing relational databases." },
  { label: 'NoSQL', value: 30, description: "Familiar with NoSQL databases like MongoDB for flexible, scalable data storage." },
  { label: 'Front End', value: 80, description: "Strong front-end skills using React, TypeScript, and modern CSS frameworks." },
  { label: 'JavaScript', value: 60, description: "Experienced with JavaScript ES6+, building interactive and dynamic web apps." },
  { label: 'TypeScript', value: 80, description: "Advocate for TypeScript to ensure robust, maintainable codebases." },
  { label: 'HTML/CSS', value: 60, description: "Skilled in semantic HTML and responsive CSS for accessible, modern UIs." },
  { label: 'UX', value: 40, description: "Focus on user experience, usability, and intuitive design principles." },
  { label: 'DevOps', value: 50, description: "Experience with CI/CD pipelines, Docker, and cloud deployments." },
  { label: 'Cloud', value: 70, description: "Worked with Azure and AWS for deploying and scaling cloud-native apps." },
  { label: 'AI/ML', value: 40, description: "Exploring AI/ML concepts and applying them to real-world problems." }
];

export default function TabbedGauge() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [gaugeValue, setGaugeValue] = useState(tabData[0].value);
  const animationRef = useRef<number | null>(null);

  // Store the previous value for smooth animation
  const prevValueRef = useRef(tabData[0].value);

  useEffect(() => {
    const targetValue = tabData[activeTab].value;
    setGaugeValue(targetValue);
    prevValueRef.current = targetValue;
    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeTab]);

  const handleChange = (event: any, newValue: number) => {
    if (event) { }
    setActiveTab(newValue);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="gauge tabs"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          width: '90vw',
          maxWidth: 1000,
        }}
      >
        {tabData.map((item, index) => (
          <Tab label={item.label} key={index} />
        ))}
      </Tabs>
      <Gauge
        width={Math.min(window.innerWidth * 0.8, 350)}
        height={Math.min(window.innerHeight * 0.5, 350)}
        value={gaugeValue}
        cornerRadius="50%"
        sx={(theme) => ({
          mt: 20,
          filter: 'drop-shadow(0 0 24px #2196f3)',
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: theme.palette.secondary.main,
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Typography variant="h6" sx={{ mt: 2, color: theme.palette.text.primary }}>
          {tabData[activeTab].description}
        </Typography>
      </motion.div>
    </div>
  );
}