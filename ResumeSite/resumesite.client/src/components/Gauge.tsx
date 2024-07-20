import React, { useState, useEffect } from 'react';
import { Tabs, Tab, useTheme } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const tabData = [
  { label: '.Net', value: 90 },
  { label: 'SQL', value: 40 },
  { label: 'Front End', value: 60 },
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
    setActiveTab(newValue);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Tabs value={activeTab} onChange={handleChange} aria-label="gauge tabs">
        {tabData.map((item, index) => (
          <Tab label={item.label} key={index} />
        ))}
      </Tabs>
      <Gauge
        width={350}
        height={350}
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