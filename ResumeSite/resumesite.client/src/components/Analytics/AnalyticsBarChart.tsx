import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import { VisitorsPerMonth } from '../../Models/Analytics';

interface AnalyticsBarChartProps {
  visitorData: VisitorsPerMonth[];
}

export default function AnalyticsBarChart({ visitorData }: AnalyticsBarChartProps) {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];
  const last = visitorData[visitorData.length - 1]?.count ?? 0;
  const prev = visitorData[visitorData.length - 2]?.count ?? 0;
  const growth = prev === 0 ? 0 : ((last - prev) / prev) * 100;
  const growthLabel = prev === 0 ? 'N/A' : `${growth > 0 ? '+' : ''}${growth.toFixed(1)}%`;

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Page views
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              {visitorData.reduce((sum, d) => sum + d.count, 0).toLocaleString()}
            </Typography>
            <Chip size="small"
              color={growth > 0 ? 'success' : growth < 0 ? 'error' : 'default'}
              label={growthLabel} />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Page views for the last 6 months
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: visitorData.map(d => d.month),
            },
          ]}
          series={[
            {
              id: 'page-views',
              label: 'Page views',
              data: visitorData.map(d => d.count),
              stack: 'A',
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          hideLegend
        />
      </CardContent>
    </Card>
  );
}