import { useState, useEffect, useRef } from 'react';
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
    if(event) {}
    setActiveTab(newValue);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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