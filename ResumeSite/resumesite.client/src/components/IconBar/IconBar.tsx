import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTheme, useMediaQuery } from '@mui/material';

const actions = [
  { icon: <FacebookIcon />, name: 'Facebook', url: 'https://www.facebook.com/dylan.lynn.56' },
  { icon: <GitHubIcon />, name: 'GitHub', url: 'https://github.com/Dlynn2' },
  {
    icon: <LinkedInIcon />,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/dylan-lynn-47b76965/',
  },
];

const IconBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <SpeedDial
      ariaLabel="Social Links"
      sx={{
        position: 'fixed',
        bottom: { xs: 20, md: 32 },
        right: { xs: 16, md: 32 },
        zIndex: 2000,
        opacity: isMobile ? 0.8 : 0.5,
        transition: 'opacity 0.3s, transform 0.3s',
        '&:hover, &:focus-within': {
          opacity: 1,
        },
        // Touch-friendly sizing on mobile
        '& .MuiFab-root': {
          width: { xs: 48, md: 56 },
          height: { xs: 48, md: 56 },
        },
        '& .MuiSpeedDialAction-fab': {
          width: { xs: 40, md: 44 },
          height: { xs: 40, md: 44 },
        },
      }}
      icon={<SpeedDialIcon />}
      direction="up"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          slotProps={{ tooltip: { title: action.name } }}
          onClick={() => window.open(action.url, '_blank')}
          sx={{ color: theme.palette.secondary.main }}
        />
      ))}
    </SpeedDial>
  );
};

export default IconBar;
