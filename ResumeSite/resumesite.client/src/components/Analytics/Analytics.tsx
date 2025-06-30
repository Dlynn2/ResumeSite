import AnalyticsBarChart from './AnalyticsBarChart';
import AnalyticsPieChart from './AnalyticsPieChart';
import { AnalyticsModel } from '../../Models/Analytics';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsModel | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/userInfo')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        return res.json();
      })
      .then((data) => {
        setAnalyticsData(data);
        setError(null);
      })
      .catch((err) => {
        setError('Unable to load analytics data. Please try again later.');
        console.error('Failed to fetch analytics data:', err);
      });
  }, []);

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: 200 }}>
        <Typography color="error">{error}</Typography>
      </Grid>
    );
  }

  if (!analyticsData) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: 200 }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <AnalyticsBarChart visitorData={analyticsData.visitorsPerMonths} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <AnalyticsPieChart
            title="Visitors By Browser"
            data={analyticsData.visitorsPerBrowsers.map((b) => ({
              label: b.browser,
              value: b.count,
            }))}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <AnalyticsPieChart
            title="Visitors By Operating System"
            data={analyticsData.visitorsPerOperatingSystems.map((os) => ({
              label: os.operatingSystem,
              value: os.count,
            }))}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <AnalyticsPieChart
            title="Visitors By Device Type"
            data={analyticsData.visitorsPerDeviceTypes.map((dt) => ({
              label: dt.deviceType,
              value: dt.count,
            }))}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <AnalyticsPieChart
            title="Visitors By Region"
            data={analyticsData.visitorsPerRegions.map((r) => ({
              label: r.regionName,
              value: r.count,
            }))}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Analytics;
