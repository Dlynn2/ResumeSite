import { useState, useEffect, useRef } from 'react';
import { Tabs, Tab, Typography, useTheme, Box, Checkbox, FormControlLabel, Stack, ToggleButton, ToggleButtonGroup, LinearProgress, Paper } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { motion } from 'framer-motion';
import { HighlightItemData, RadarChart, RadarSeries } from '@mui/x-charts';
import React from 'react';

const tabData = [
  {
    label: '.Net',
    value: 90,
    description:
      'Expert in .NET Core and ASP.NET for building scalable web APIs and enterprise applications.',
  },
  {
    label: 'Java',
    value: 60,
    description:
      'Solid experience with Java for backend services, Android apps, and cross-platform solutions.',
  },
  {
    label: 'Python',
    value: 40,
    description: 'Used Python for scripting, automation, and data analysis tasks.',
  },
  {
    label: 'SQL',
    value: 80,
    description: 'Proficient in SQL for designing, querying, and optimizing relational databases.',
  },
  {
    label: 'NoSQL',
    value: 60,
    description: 'Familiar with NoSQL databases like MongoDB for flexible, scalable data storage.',
  },
  {
    label: 'Front End',
    value: 80,
    description: 'Strong front-end skills using React, TypeScript, and modern CSS frameworks.',
  },
  {
    label: 'JavaScript',
    value: 80,
    description: 'Experienced with JavaScript ES6+, building interactive and dynamic web apps.',
  },
  {
    label: 'TypeScript',
    value: 80,
    description: 'Advocate for TypeScript to ensure robust, maintainable codebases.',
  },
  {
    label: 'HTML/CSS',
    value: 70,
    description: 'Skilled in semantic HTML and responsive CSS for accessible, modern UIs.',
  },
  {
    label: 'UX',
    value: 40,
    description: 'Focus on user experience, usability, and intuitive design principles.',
  },
  {
    label: 'DevOps',
    value: 60,
    description: 'Experience with CI/CD pipelines, Docker, and cloud deployments.',
  },
  {
    label: 'Cloud',
    value: 70,
    description: 'Worked with Azure and AWS for deploying and scaling cloud-native apps.',
  },
  {
    label: 'AI/ML',
    value: 40,
    description: 'Exploring AI/ML concepts and applying them to real-world problems.',
  },
];

export default function TabbedGauge() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [gaugeValue, setGaugeValue] = useState(tabData[0].value);
  const animationRef = useRef<number | null>(null);

  // For radar chart
  const [highlightedItem, setHighlightedItem] = useState<HighlightItemData | null>(null);
  const [fillArea, setFillArea] = useState(false);

  // For main UI tabs
  const [mainTab, setMainTab] = useState(0);

  useEffect(() => {
    const targetValue = tabData[activeTab].value;
    setGaugeValue(targetValue);
    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeTab]);

  const handleSkillTabChange = (event: any, newValue: number) => {
    if (event) event.preventDefault();
    setActiveTab(newValue);
  };

  const handleMainTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (event) event.preventDefault();
    setMainTab(newValue);
  };

  const withOptions = (series: RadarSeries[]) =>
    series.map((item) => ({
      ...item,
      fillArea,
      type: 'radar' as const,
    }));

  function valueFormatter(v: number | null) {
    if (v === null) return 'NaN';
    return `${v}%`;
  }

  // Replace your series and radar definitions with:
const radarMetrics = tabData.map(skill => skill.label);

const series = [
  {
    id: 'skills',
    label: 'My Skills',
    data: tabData.map(skill => skill.value), // <-- Array of numbers!
    valueFormatter,
  },
];

const radar = {
  metrics: radarMetrics,
  max: 100, // Optional: set max value for better scaling
};

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
      <Tabs
        value={mainTab}
        onChange={handleMainTabChange}
        aria-label="Skill Visualization Tabs"
        sx={{ mb: 4 }}
        centered
      >
        <Tab label="Radar Chart" />
        <Tab label="Progress Bars" />
        <Tab label="Gauge" />
      </Tabs>

      {/* Radar Chart Tab */}
      {mainTab === 0 && (
        <Stack sx={{ width: '100%' }} spacing={2} alignItems={'center'}>
          <ToggleButtonGroup
            value={highlightedItem?.seriesId ?? null}
            exclusive
            onChange={(event, newHighLightedSeries) => {
              if (newHighLightedSeries !== null) {
                event.preventDefault();
                setHighlightedItem((prev) => ({
                  ...prev,
                  seriesId: newHighLightedSeries,
                }));
              }
            }}
            aria-label="highlighted series"
            fullWidth
            size="small"
          >
            {series.map((item) => (
              <ToggleButton
                key={item.id}
                value={item.id}
                aria-label={`series ${item.label}`}
              >
                {item.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Box sx={{ width: '100%' }}>
            <RadarChart
              height={350}
              highlight="series"
              highlightedItem={highlightedItem}
              onHighlightChange={setHighlightedItem}
              slotProps={{ tooltip: { trigger: 'item' } }}
              series={withOptions(series)}
              radar={radar}
            />
          </Box>
          <FormControlLabel
            checked={fillArea}
            control={
              <Checkbox onChange={(event) => setFillArea(event.target.checked)} />
            }
            label="Fill area"
            labelPlacement="end"
          />
        </Stack>
      )}

      {/* Progress Bars Tab */}
      {mainTab === 1 && (
        <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            My Skills
          </Typography>
          <Stack spacing={3}>
            {tabData.map((skill) => (
              <Paper key={skill.label} sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ minWidth: 100 }}>
                    <Typography variant="subtitle1">{skill.label}</Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={skill.value}
                      sx={{
                        height: 12,
                        borderRadius: 6,
                      }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 40 }}>
                    <Typography variant="body2" color="text.secondary">
                      {skill.value}%
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  {skill.description}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Box>
      )}

      {/* Gauge Tab */}
      {mainTab === 2 && (
        <Box
          sx={{
            width: '100%',
            maxWidth: 700,
            mx: 'auto',
            mt: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // <-- Center content horizontally
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleSkillTabChange}
            aria-label="gauge tabs"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              width: '100%',
              maxWidth: 700,
              mb: 2,
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
              mt: 8,
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
            <Typography variant="h6" sx={{ mt: 2, color: theme.palette.text.primary, textAlign: 'center' }}>
              {tabData[activeTab].description}
            </Typography>
          </motion.div>
        </Box>
      )}
    </Box>
  );
}