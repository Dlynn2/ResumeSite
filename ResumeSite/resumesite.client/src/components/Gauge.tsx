import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const tabData = [
  { label: '.Net', value: 90 },
  { label: 'Java', value: 60 },
  { label: 'Python', value: 40 },
  { label: 'SQL', value: 60 },
  { label: 'NoSQL', value: 30 },
  { label: 'Front End', value: 80 },
  { label: 'JavaScript', value: 60 },
  { label: 'TypeScript', value: 80 },
  { label: 'HTML/CSS', value: 60 },
  { label: 'UX', value: 40 },
  { label: 'DevOps', value: 50 },
  { label: 'Cloud', value: 70 },
  { label: 'AI/ML', value: 40 }
];

export default function TabbedGauge() {
  const [activeTab, setActiveTab] = useState(0);
  const [gaugeValue, setGaugeValue] = useState(tabData[0].value);

  const animateGaugeValue = (startValue: number, endValue: number) => {
    const duration = 800; // Animation duration in milliseconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Ensure progress doesn't exceed 1
        const valueChange = endValue - startValue;
        // Round the currentValue to the nearest integer
        const currentValue = Math.round(startValue + valueChange * progress);
        setGaugeValue(currentValue);
      
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const targetValue = tabData[activeTab].value;
    animateGaugeValue(gaugeValue, targetValue);
  }, [activeTab]); // Trigger animation when activeTab changes

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    if(event){
      
    }
    setActiveTab(newValue);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="gauge tabs"
        variant="scrollable" // Enable horizontal scrolling
        scrollButtons="auto" // Show scroll buttons as needed
        allowScrollButtonsMobile // Optional: show scroll buttons on mobile
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
    </div>
  );
}